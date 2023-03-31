public with sharing class HellowWorld {
    public string message {get; set;}
    
    public HellowWorld() {
        message = 'Hellow';
        System.debug(message);
    }
}