/**
 * Serves as the controller for the QR-to-Lead LWC.
 */
public with sharing class QRtoLeadController {

    /**
     * Returns a map of the active QR-to-Lead mappings.
     * 
     * @return the active mappings
     */
    @AuraEnabled(cacheable=true)
    public static Map<String, QRtoLeadMapping__mdt> getKeyedVCardLeadMappings() {
        Map<String, QRtoLeadMapping__mdt> mappingsByVCardProperty = new Map<String, QRtoLeadMapping__mdt>();
        try {
            for (QRtoLeadMapping__mdt mapping : [SELECT vCardPropertyName__c, LeadFieldName__c, DefaultValue__c, IsActive__c, IsRequired__c
                    FROM QRtoLeadMapping__mdt
                    WHERE IsActive__c = TRUE]) {
                mappingsByVCardProperty.put(mapping.vCardPropertyName__c, mapping);
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return mappingsByVCardProperty;
    }

    /**
     * Answers whether the scanned lead already exists for the current user through a simple matching rule.
     * 
     * This check prevents duplicate leads from being created.
     * 
     * @return true if the user already has this lead
     */
    @AuraEnabled(cacheable=false)
    public static Boolean isLeadNew(QRtoLeadWrapper leadToCheck) {
        Integer count = [SELECT count()
                        FROM Lead
                        WHERE OwnerId = :UserInfo.getUserId() AND
                        LastName = :leadToCheck.lastName AND
                        Email = :leadToCheck.email];

        return count == 0;
    }

}