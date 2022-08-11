# REST API REGIME

Déscription de toutes les fonctionnalités de notre API REST avec tous les paramètres nécessaires et tous les retours

## Point d'entrée

Points d'entrées pour authentification/inscription

- [Login Etape 1](API_documents/users/login_stage_1.md) : `POST /user/login/stage1`
- [Register](API_documents/users/register.md) : `POST /user/register`

## Services nécessitant une authentification

Services nécessitant qu'un jeton valide soit inclus dans l'en-tête de la demande. Le jeton est acquis à partir de l'authentification 'login Etape 2'

**USER:**


