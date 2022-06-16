### Using QR-to-Lead for your Conference

There are several steps required in order to use QR-to-Lead for your conference. These instructions assume your users will be in the **same** org. Depending on which tools and other conference products you're using with your conference, some of the steps below may not be required.

1.  Produce a badge that has a QR Code contain a vCard with contact info. If you are creating your own badge, you'll need to:  
    - Prep the attendee data for QR code generation. At a minimum, a Lead record requires a last name and company (unless Person Accounts are enabled). Ideally, a lead would have an email address.
    - Create a document for mail merge. For example, Microsoft Word and Excel can be used for this process.
    - Print a test badge so QR codes will be the approximate size.

2.  Deploy `QR-to-Lead` to your org using the Deployment steps noted in the [README](/README.md#deployment).

3.  Disable the Lead duplicate check in your org. This will allow more than one user to scan the same lead. Each user will only see their own instance.

4.  On your device, launch the Salesforce mobile app and scan a vCard QR code using the app.  

5.  Verify the lead has been created in Salesforce and data landed where you expected.  

6.  In the mobile app, verify that your QR-to-Lead user is not able to see other objects, reports, etc. See [#4](https://github.com/open-force/qr-to-lead/issues/4) for more info.  

7.  Create your users in the org with the `QR-to-Lead` profile. Don't send their welcome emails just yet!  

8.  Create any on-boarding documentation needed ([example](https://www.cactusforce.com/lead-gen)).  

Optional steps in the org's Setup:  
1. Customize the app's labels.  
2. Use different icons for the tab.  
