@IsTest(seeAllData=false)
private class QRtoLeadController_Test {

    @IsTest
    static void getKeyedVCardLeadMappingsTest(){
        Test.startTest();
        Map<String, QRtoLeadMapping__mdt> mappingsByVCardProperty = QRtoLeadController.getKeyedVCardLeadMappings();
        Test.stopTest();

        System.assertNotEquals(null, mappingsByVCardProperty, 'Mappings should not be null');
        System.assert(mappingsByVCardProperty.size() > 0, 'At least one mapping should be returned');
    }

    @IsTest
    static void isLeadNewTest_true(){
        QRtoLeadWrapper leadToCheck = new QRtoLeadWrapper();
        leadToCheck.LastName = 'Last';
        leadToCheck.Email = 'last@email.com';
        leadToCheck.Company = 'Company';

        Test.startTest();

        Boolean result = QRtoLeadController.isLeadNew(leadToCheck);

        Test.stopTest();

        System.assertEquals(true, result, 'The lead should be considered new');
    }

    @IsTest
    static void isLeadNewTest_false() {
        Lead lead = new Lead();
        lead.LastName = 'Last';
        lead.Email = 'last@email.com';
        lead.Company = 'Company';
        insert lead;

        QRtoLeadWrapper leadToCheck = new QRtoLeadWrapper();
        leadToCheck.LastName = 'Last';
        leadToCheck.Email = 'last@email.com';
        leadToCheck.Company = 'Company';

        Test.startTest();

        Boolean result = QRtoLeadController.isLeadNew(leadToCheck);

        Test.stopTest();

        System.assertEquals(false, result, 'The lead should not be considered new');
    }
}
