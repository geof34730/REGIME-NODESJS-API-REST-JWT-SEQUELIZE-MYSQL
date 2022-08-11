# REST API REGIME

Déscription de toutes les fonctionnalités de notre API REST avec tous les paramètres nécessaires et tous les retours

## Point d'entrée

Point d'entrée pour authentification

- [Login Etape 1](API_documents/users/login_stage_1.md) : `POST /user/login/stage1`
- [register](API_documents/users/register.md) : `POST /user/register`

## Services nécessitant une authentification

Services nécessitant qu'un jeton valide soit inclus dans l'en-tête de la demande. Le jeton est acquis à partir de l'authentification 'login'

**USERS:**



#- [Create User](user/create.md) : `POST /api/users`


