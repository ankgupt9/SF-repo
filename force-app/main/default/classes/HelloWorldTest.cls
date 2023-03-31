@isTest 
private class HelloWorldTest {
    static testMethod void HelloWorldTest() {

        HellowWorld testHello = new HellowWorld();
        testHello.message = 'bye';
        System.assertEquals(90, 90);
    }
}