import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';
import { createRecord } from 'lightning/uiRecordApi';
import parse from './vCardParser';
import getKeyedVCardLeadMappings from '@salesforce/apex/QRtoLeadController.getKeyedVCardLeadMappings';
import isLeadNew from '@salesforce/apex/QRtoLeadController.isLeadNew';
import LEAD_OBJECT from '@salesforce/schema/Lead';

import COMPANY_LABEL from '@salesforce/label/c.COMPANY_LABEL';
import EMAIL_LABEL from '@salesforce/label/c.EMAIL_LABEL';
import ENABLE_DEBUG_MODE from '@salesforce/label/c.ENABLE_DEBUG_MODE';
import FIRST_NAME_LABEL from '@salesforce/label/c.FIRST_NAME_LABEL';
import LAST_NAME_LABEL from '@salesforce/label/c.LAST_NAME_LABEL';
import LEAD_EXISTS_MESSAGE from '@salesforce/label/c.LEAD_EXISTS_MESSAGE';
import LEAD_EXISTS_TITLE from '@salesforce/label/c.LEAD_EXISTS_TITLE';
import NEW_LEAD_SUCCESS_MESSAGE from '@salesforce/label/c.NEW_LEAD_SUCCESS_MESSAGE';
import NEW_LEAD_SUCCESS_TITLE from '@salesforce/label/c.NEW_LEAD_SUCCESS_TITLE';
import PAGE_SUBTITLE from '@salesforce/label/c.PAGE_SUBTITLE';
import PAGE_TITLE from '@salesforce/label/c.PAGE_TITLE';
import SCAN_QR_CODE from '@salesforce/label/c.SCAN_QR_CODE';
import SCAN_QR_CODE_TITLE from '@salesforce/label/c.SCAN_QR_CODE_TITLE';
import SCANNING_ERROR_MESSAGE from '@salesforce/label/c.SCANNING_ERROR_MESSAGE';
import SCANNING_ERROR_TITLE from '@salesforce/label/c.SCANNING_ERROR_TITLE';
import SCANNING_NOT_AVAILABLE_MESSAGE from '@salesforce/label/c.SCANNING_NOT_AVAILABLE_MESSAGE';
import SCANNING_NOT_AVAILABLE_TITLE from '@salesforce/label/c.SCANNING_NOT_AVAILABLE_TITLE';

export default class LeadScanner extends LightningElement {

    barcodeScanner;
    scanButtonDisabled = false;
    vCardLeadMappings;
    debugModeEnabled = false;

    lead = {};
    duplicateLeadCheck = {};

    labels = {
        COMPANY_LABEL,
        EMAIL_LABEL,
        ENABLE_DEBUG_MODE,
        FIRST_NAME_LABEL,
        LAST_NAME_LABEL,
        LEAD_EXISTS_MESSAGE,
        LEAD_EXISTS_TITLE,
        NEW_LEAD_SUCCESS_MESSAGE,
        NEW_LEAD_SUCCESS_TITLE,
        PAGE_SUBTITLE,
        PAGE_TITLE,
        SCAN_QR_CODE,
        SCAN_QR_CODE_TITLE,
        SCANNING_ERROR_MESSAGE,
        SCANNING_ERROR_TITLE,
        SCANNING_NOT_AVAILABLE_MESSAGE,
        SCANNING_NOT_AVAILABLE_TITLE
    };

    // retrieve the vCard/Lead mappings
    @wire(getKeyedVCardLeadMappings)
    getMappings({error, data}) {
        if (data) {
            this.vCardLeadMappings = data;
        } else if (error) {
            this.showDebug('Configuration Error', 'Unable to load custom vCard/Lead mappings: ' + JSON.stringify(error), 'error', 'sticky');
        }
    }

    // when this component is initialized, detect whether to enable the Scan button
    connectedCallback() {
        this.barcodeScanner = getBarcodeScanner();
        if (this.barcodeScanner == null || !this.barcodeScanner.isAvailable()) {
            this.scanButtonDisabled = true;
        }
    }

    renderedCallback() {
    }

    // invoked by the user click on the Scan QR Code button
    handleBeginScanClick(event) {

        // Make sure BarcodeScanner is available before trying to use it
        // Note: We also disable the Scan button if there's no BarcodeScanner
        if (this.barcodeScanner != null && this.barcodeScanner.isAvailable()) {
            const scanningOptions = {
                barcodeTypes: [this.barcodeScanner.barcodeTypes.QR]
            };
            this.barcodeScanner
                .beginCapture(scanningOptions)
                .then((result) => {
                    this.showDebug('Code scanned: ' + JSON.stringify(result.value), '', 'success', 'sticky');
                    this.parseCodeWithVCard(result.value);

                    isLeadNew({ leadToCheck: this.duplicateLeadCheck })
                    .then((result) => {
                        if (result) {
                            this.createLead();
                        } else {
                            const message = this.formatCustomLabel(LEAD_EXISTS_MESSAGE, [this.getLeadName()]);
                            this.showToast(this.labels.LEAD_EXISTS_TITLE, message, 'success', 'dismissable');
                        }
                    })
                    .catch((error) => {
                        this.showToast(this.labels.DUPLICATE_LEAD_CHECK_TITLE, this.labels.DUPLICATE_LEAD_CHECK_MESSAGE, 'error', 'sticky');
                    });
                })
                .catch((error) => {
                    // Handle cancellation and unexpected errors here
                    this.resetDisplay();

                    if (error.code === 'USER_DISMISSED') {
                        // Don't show an error if scanner is dismissed
                    } else {
                        // Inform the user we ran into something unexpected
                        this.showToast(this.labels.SCANNING_ERROR_TITLE, this.labels.SCANNING_ERROR_MESSAGE, 'error', 'sticky');
                    }
                })
                .finally(() => {
                    // Clean up by ending capture
                    this.barcodeScanner.endCapture();
                });
        } else {
            // Not running on hardware with a camera, or some other context issue
            // Let user know they need to use a mobile phone with a camera
            this.showToast(this.labels.SCANNING_NOT_AVAILABLE_TITLE, this.labels.SCANNING_NOT_AVAILABLE_MESSAGE, 'error', 'sticky');
        }
    }

    parseCodeWithVCard(scannedCode) {
        this.lead = {};

        let vCard = parse(scannedCode);
        this.showDebug('Parsed vCard', JSON.stringify(vCard), 'success', 'sticky');

        for (const [vCardProperty, mapping] of Object.entries(this.vCardLeadMappings)) {
            const leadField = mapping.LeadFieldName__c;
            const vCardJsonKey = vCardProperty.toLowerCase();

            let value = '';
            try {
                // warning: hack ahead
                const N_PROPERTY = 'n[';
                if (vCardJsonKey.startsWith(N_PROPERTY)) {
                    // 'n' is more complicated
                    // have not found a way yet to query the vCard object with a search string similar to XPath
                    const index = vCardProperty.substring(2, 3);
                    value = vCard.n[0].value[index];
                } else {
                    value = vCard[vCardJsonKey][0].value;
                }
            } catch (error) {
                value = mapping.DefaultValue__c;
            }

            this.lead[leadField] = value;
        }

        // prepare for the duplicate lead check
        this.duplicateLeadCheck.lastName = this.lead.LastName;
        this.duplicateLeadCheck.company = this.lead.Company;
        this.duplicateLeadCheck.email = this.lead.Email;

        this.showDebug('Generated lead: ' + JSON.stringify(this.lead), '', 'success', 'sticky');
    }

    createLead() {
        // load the fields object with field names and their values
        const fields = {};
        for (const [key, value] of Object.entries(this.lead)) {
            fields[key] = this.lead[key];
        }
        
        this.showDebug('Creating lead with fields: ' + JSON.stringify(fields), '', 'success', 'sticky');

        const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(record => {
                const message = this.formatCustomLabel(NEW_LEAD_SUCCESS_MESSAGE, [this.getLeadName()]);
                this.showToast(this.labels.NEW_LEAD_SUCCESS_TITLE, message, 'success', 'dismissable');
            })
            .catch(error => {
                this.showToast(this.labels.NEW_LEAD_ERROR_TITLE, this.labels.NEW_LEAD_ERROR_DESCRIPTION, 'error', 'sticky');
                this.resetDisplay();
            });
    }

    resetDisplay() {
        this.lead = {};
    }

    showDebug(title, message, variant, mode) {
        console.debug('QR: ' + message);

        if (this.debugModeEnabled) {
            this.showToast(title, message, variant, mode);
        }
    }

    showToast(title, message, variant, mode) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: '\n' + message,
                variant: variant,
                mode: mode
            })
        );
    }

    onDebugModeChange(event) {
        this.debugModeEnabled = event.target.checked;
    }

    getLeadName() {
        return this.lead.FirstName + ' ' + this.lead.LastName;
    }

    formatCustomLabel(label, parameters) {
        let split = label.split(' ');
        let output = '';
        let parameterIndex = 0;
        for (let i = 0; i < split.length; i++) {
            if (split[i].includes('{' + parameterIndex + '}')) {
                output += split[i].replace(parameterIndex.toString(), parameters[parameterIndex]) + ' ';
                parameterIndex++;
            } else {
                output += split[i] + ' ';
            }
        }

        return output.replaceAll('{', '').replaceAll('}','');
    }

}