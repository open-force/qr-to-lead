# QR-to-Lead

QR-to-Lead is a Salesforce Lightning mobile app that creates Lead records from scanned QR codes containing [vCards](https://en.wikipedia.org/wiki/VCard). Its core functionality is drawn from the ["Scan Barcodes on a Mobile Device"](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.use_barcodescanner) section in the Lightning Web Components Dev Guide.

**Note**: Users must have access to the Lead object. Both the **Salesforce** and **Partner Community** licenses provide this.

<img alt="Start" src="/docs/images/app-scan-page.jpg?raw=true" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Viewer" src="/docs/images/app-scan-viewer.jpg?raw=true" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Success" src="/docs/images/app-scan-success.jpg?raw=true" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Leads" src="/docs/images/app-lead-list.jpg?raw=true" width="150" />

# A Conference Sponsor Use Case
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
3. Log into the org and create a new user (e.g. "QR2L User"). Assign the `QR-to-Lead User` profile and finish the normal Salesforce user activation process. A permission set is also available to provide similar access to an existing user.

### Setting up the Device
4. Install the Salesforce mobile app on your iOS or Android device ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/lex_salesforce1_basics/lex_salesforce1_basics_getting_started)).
5. Launch the Salesforce mobile app. If using a sandbox rather than a Dev Org for your environment, you will need change the server to "Sandbox".
6. Sign in with the QR-to-Lead-enabled user. After a few moments, you should see a screen similar to this (insert image here).

### Using the App
7. Tap on the QR scan icon on the bottom button bar to switch to the scanning page. 
8. Tap on the blue "Scan QR Code" button to start the scanner and then position the QR code within the view. Use one of the QR codes below. The code will scan automatically. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Astro QR code](/docs/images/astro-qr-code-150x150.png?raw=true)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Codey QR code](/docs/images/codey-qr-code-150x150.png?raw=true)

9. Once a QR code has scanned and processed, a green toast will appear stating that the lead was created in Salesforce. Its basic info should also be displayed on the page.
10. Switch to the Leads tab. You should now see the lead in the list and be able to edit or delete it.

# Deployment
QR-to-Lead can be deployed using the [GitHub Salesforce Deploy Tool](https://github.com/afawcett/githubsfdeploy).  
<br>
<a href="https://githubsfdeploy.herokuapp.com?owner=marisahambleton&repo=qr-to-lead&ref=main">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

### Steps
1. Enter the following info:  
**GitHub Owner**: `open-force`  
**Repository**: `qr-to-lead`  
**Branch/Tag/Commit**: `main`  
2. Click "Login to Salesforce" button on the page upper-right and log in when prompted.
3. You may be prompted to allow access for the GitHub Salesforce Deploy Tool. Click the "Allow" button.
4. The contents of the project will be displayed. Click on the "Deploy" button on the upper-right of the page.
5. If you upon clicking you receive a "Failed error" message, refresh the page and repeat step 4 several times.

The process should complete successfully within a few minutes:
```
Deployment Started
Status: Queued 
Status: InProgress 
...
Status: Completed 
Deployment Complete
```

# vCard/QR Code Generators
- [QR Code - Online](https://qrcode-online.com/vcard)
- [TEC-IT QR Code Generator](https://qrcode.tec-it.com/en/vcard)

# Specifications
[Lead Object](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_lead.htm)  
[vCard 3.0](https://www.rfc-editor.org/rfc/rfc2426#section-4)  
[vCard 4.0](https://datatracker.ietf.org/doc/html/rfc6350)  
