public with sharing class HellowWorld {
    public string message {get; set;}
    
    public HellowWorld() {
        message = 'Hello';
        System.debug(message);
    }
}