/**
 * Wrapper class for Lead fields.
 */
public with sharing class QRtoLeadWrapper {
    
    @AuraEnabled
    public String lastName { get; set; }

    @AuraEnabled
    public String company { get; set; }

    @AuraEnabled
    public String email { get; set; }
}
