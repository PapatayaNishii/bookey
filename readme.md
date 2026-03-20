🛠️ Bookey Project Environment Setup Guide



**Step 1: Terminal Setup and Git Clone in Eclipse**

Follow these steps to fetch the source code using the internal terminal in Eclipse.



&#x20;1. Open Terminal: Go to Window > Show View > Other... > Terminal.



&#x20;2. Launch New Terminal: Click the Open a New Terminal View icon and select Git Bash.



&#x20;3. Check Version: Type git --version in the terminal to verify installation.



&#x20;4. Change Directory:



&#x20; A. Type cd D: and press Enter.



&#x20; B. Type cd ./dev/workspace to move to your workspace folder.



&#x20;5. Clone Project: Use the URL from the Bookey GitHub repository.



&#x20; A. Run: git clone https://github.com/beenjh6088/bookey.git



**Step 2: Project Import and Server Deployment**

Import the cloned source into Eclipse and register it with the Tomcat server.



&#x20;1. Import Project: Right-click in Project Explorer > Import... > Existing Projects into Workspace and select the bookey folder.



&#x20;2. Add to Server: In the Servers tab, right-click on your Tomcat server and select Add and Remove....



&#x20;3. Register App: Select bookey from the left list and move it to the right (Configured).



&#x20;4. Configure Path: Double-click Tomcat in the Servers tab > Go to the Modules tab at the bottom > Select bookey, click Edit, and change the Path to /.



**Step 3: Database Connection Pool (JNDI) Configuration**

Configure the Oracle database connection details for the DAO.



&#x20;1. Open Configuration: Open the context.xml file located in the Servers project.



&#x20;2. Add Resource: Insert the following snippet inside the <Context> tag:



&#x20;  <Resource name="jdbc/oracle"

&#x20;         auth="Container"

&#x20;         type="javax.sql.DataSource"

&#x20;         driverClassName="oracle.jdbc.OracleDriver"

&#x20;         url="jdbc:oracle:thin:@localhost:1521:xe"

&#x20;         username="bookey"

&#x20;         password="tiger"

&#x20;         maxActive="20"

&#x20;         maxIdle="10"

&#x20;         maxWait="-1"/>

