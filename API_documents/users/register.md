## **REGISTER**

Service d'inscription au site

**URL**

    /user/register

**Method:**

`POST`

**Auth required :**  NON

**Required:**


- **Data Params (BODY)**

    ```json
    {
      pseudo: "pseudo",
      email: "email",
      password: "password",
      datenaissance:  "1978/07/28",
      sexe:"F" pour feminin "M" pour masculin,
      taille: "186",
      imageprofil: [image blob base64]
    }
    ```

**Response:**
- **Success Response:**

    - **Code:** 200 <br />
      **Content:**

    ```json
        {
        message: "votre inscription à bien été pris en compte, un email vient de vous ètre envoyé à l'adresse [EMAIL USER] pour que vous confirmiez votre inscription",
        code: 'UR1'  
        }
    ```
- **Error Response:**

    - **Code:** 500 NOT FOUND <br />
      **Content:**
    ```json
        {
        error: [DESCRIPTION ERREUR],
        code: 'UR2'
        }
    ```

    **OR**

- **Code:** 403 FORBIDDEN <br />
  **Content:**
    ```json
      {
      error: "Vous êtes déjà inscrit, merci de vous identifier avec votre email et votre mot de passe.",
      code: 'UR3'
      }
    ```
  **OR**

- **Code:** 500 NOT FOUND  <br />
  **Content:**
    ```json
      {
      error: [DESCRIPTION ERREUR],
      code: 'UR4'
      }
    ```
  **OR**
- **Code:** 500 NOT FOUND  <br />
  **Content:**
  ```json
      {
      error: [DESCRIPTION ERREUR],
      code: 'UR5'
      }
   ```

