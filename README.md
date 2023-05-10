# ISMS
Information-Security-Management-System

Make sure that you install node, Angular, Java17, Spring tools in your local machine.
install nodeJS  https://nodejs.org/en/download
install angular  https://angular.io/guide/setup-local
install STS or VScode and set up environment STS link https://spring.io/tools.. but my preference is to use VSCode.. It is very much fluid than STS.

For material designs and UI packages make sure that you install angualr material via npm https://v5.material.angular.io/guide/getting-started
we need to install this after installing angular and also install FormsModule and HTTP modeules in angular these are external dependencies.

NOTE: (also used few other angular ui packages to make the ui fluid)
If any other dependencies are at the time of executing the application with command ng serve, angular will show the packages that are missing and asks us to install on our local machine. 


Run angular application using the below command
ng serve --ssl true --ssl-key localhost.key --ssl-cert localhost.crt

Coming to spring application try to open the spring boot application in vscode/STS(Spring tool suite). These I
DE's will help to execute this MAVEN project easily


Security features:
-> storing the resource in a secured fashion encrypted via AES algo.. and password, secret keys were encoded and stored in database
-> if the user/admin is not authenticated then he/she cannot login
-> if the user/admin is not authorised to access the specific endpoint then he/she cannot access the endpoints.
-> Monitoring dash-board.. so that admin can monitor the status of the application like the request and response tracking, visulization of the status of responses, status of db and backend webserver..
-> captcha to avoid DOS attacks
-> used parameterised quries and JPA this helps to avoid SQL injections.
-> can send the notifications and alerts to the desired people .. this feature ensures the privacy in communication.
-> Admin can approve/reject the activation request that are raised by users.. this helps admin to avoid the registration of irrelavent users.
-> website is running with https protocol as i self signed the certificate and trusted the certificate.

spring authetication and authorizations filter.
    https://www.marcobehler.com/guides/spring-security

filters used in this application:

JwtAuthenticationFilter
corsFilter
UsernamePasswordAuthenticationFilter
inbuilt Authorization filter - this will authorize based on the roles. used 2 roles (ROLE_ADMIN, ROLE_USER)


Keytool - key and certificate management tool
keytool is available in jdk.. so by default when u install u r jdk in the system
more abt keytool:
https://docs.oracle.com/javase/7/docs/technotes/tools/windows/keytool.html





