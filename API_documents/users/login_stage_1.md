## **Login Stage 1**

Service permetant de savoir si l'utilisateur est inscrit en BDD avec son email.

**URL**

    /user/login/stage1

**Method:**

`POST`

**Auth required :**  NON

**Required:**


- **Data Params (BODY)**

    ```json
    {
      email: "email",
    }
    ```

**Response:**
- **Success Response:**

    - **Code:** 200 <br />
      **Content:**

    ```json
    {
       userRegister: [boolean],
       code: 'UL1'  
    }
    ```
- **Error Response:**

    - **Code:** 500 NOT FOUND <br />
      **Content:**
    ```json
        {
        error: [DESCRIPTION ERREUR],
        code: 'UL2'
        }
    ```




