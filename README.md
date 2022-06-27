# QR-to-Lead

QR-to-Lead is a Salesforce Lightning mobile app that creates Lead records from scanned QR codes containing [vCards](https://en.wikipedia.org/wiki/VCard). Its core functionality is drawn from the ["Scan Barcodes on a Mobile Device"](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.use_barcodescanner) section in the Lightning Web Components Dev Guide.

**Note**: Users must have access to the Lead object. Both the **Salesforce** and **Partner Community** licenses provide this.

<img alt="Start" src="/docs/images/app-scan-page.jpg?raw=true" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Viewer" src="/docs/images/app-scan-viewer.jpg?raw=true" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Success" src="/docs/images/app-scan-success.jpg?raw=true" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Leads" src="/docs/images/app-lead-list.jpg?raw=true" width="150" />

# A Conference Use Case
An early version of QR-to-Lead was used successfully by [Cactusforce 2022](https://www.cactusforce.com/lead-gen) sponsors for scanning attendee badges. Sponsors were able to privately manage their leads (e.g. adding notes). Leads could be exported from the Salesforce desktop site using a provided custom report.

# Components
1. Lightning app, record page, and utility bar
2. LWC
3. [vCard parser](https://www.npmjs.com/package/vcard-parser)
4. Apex classes (2)
5. Custom metadata type and data
6. Permission set
7. Profile 
8. Lead Report

# Quick Start
### Preparing the Salesforce Environment
1. Create a [Development Edition Org](https://developer.salesforce.com/signup) or use an existing one.
2. Deploy this app to the org using the GitHub Salesforce Deploy Tool (see the [Deployment section](https://github.com/open-force/qr-to-lead#deployment) for details).
3. Log into the org and create a new user (e.g. "QR2L User"). Assign the `QR-to-Lead User` profile and finish the normal Salesforce user activation process. A permission set is also available to provide similar access to an existing user with a different profile.

### Setting up the Device
4. Install the Salesforce mobile app on your iOS or Android device ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/lex_salesforce1_basics/lex_salesforce1_basics_getting_started)).
5. Launch the Salesforce mobile app. If using a sandbox rather than a Dev Org for your environment, you will need change the server to "Sandbox".
6. Sign in with the QR-to-Lead-enabled user. After a few moments, you should see a screen like the one above.

### Using the App
7. Tap on the QR scan icon on the bottom button bar to switch to the scanning page. 
8. Tap on the blue "Scan QR Code" button to start the scanner and then position the QR code within the view. For convenience, use one of the QR codes below. The code will scan automatically. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Astro QR code](/docs/images/astro-qr-code-150x150.png?raw=true)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Codey QR code](/docs/images/codey-qr-code-150x150.png?raw=true)

9. Once a QR code has been scanned and processed, a green toast will appear stating that the lead was created in Salesforce. Its basic info will also be displayed.
10. Switch to the Leads tab. You should now see the lead in the list and be able to edit or delete it.

# Deployment
QR-to-Lead can be deployed using the [GitHub Salesforce Deploy Tool](https://github.com/afawcett/githubsfdeploy).  
<br>
<a href="https://githubsfdeploy.herokuapp.com?owner=open-force&repo=qr-to-lead&ref=main">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

### Steps
1. Enter the following info:  
**GitHub Owner**: `open-force`  
**Repository**: `qr-to-lead`  
**Branch/Tag/Commit**: `main`  
2. Click "Login to Salesforce" button in the upper-right of the page and log in when prompted.
3. You may be prompted to grant org access to the GitHub Salesforce Deploy Tool. Click the "Allow" button.
4. The contents of the project will be listed. Click on the "Deploy" button.
5. If you upon clicking you receive a "Failed error" message, refresh the page and repeat step 4 again.

The process should complete successfully within a few minutes:
```
Deployment Started
Status: Queued 
Status: InProgress 
Status: InProgress 
...
Status: Completed 
Deployment Complete
```
# App Customizations

## Text Changes
Custom labels contain the text used throughout the app except for the application name and the custom tab (see below). Each custom label uses the `QRtoLead` category.

To change a label's value:
1. In Setup, search for "Custom Label"
2. Find the custom label to change and update its value. Save changes.
3. Restart the Salesforce Mobile app to see the new value. You may also need to clear the Salesforce Mobile's cache.

### Changing the Application Name
1. In Setup, search for `App Manager`
2. Edit `QR-to-Lead` app
3. Change the `App Name` field to the new value and click Save button.
4. Change the `App Branding` elements (image, color) if desired.

### Changing the Lead Scan Tab's Label
1. In Setup, search for "tabs" and select "Tabs.
2. Edit the "Scan" Lightning Component tab.
3. Change the tab label to your new value.
4. Change the tab style if desired.

# vCard/QR Code Generators
- [QR Code - Online](https://qrcode-online.com/vcard)
- [TEC-IT QR Code Generator](https://qrcode.tec-it.com/en/vcard)

# Specifications
[Lead Object](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_lead.htm)  
[vCard 3.0](https://www.rfc-editor.org/rfc/rfc2426#section-4)  
[vCard 4.0](https://datatracker.ietf.org/doc/html/rfc6350)  
