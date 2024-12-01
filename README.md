# Plataforma de Intercambio y Venta de Juegos de Mesa

Este proyecto esta siendo desarrollado como una forma de **aprender y poner en práctica los conocimientos adquiridos** en el curso de **AWS Practitioner**. La plataforma permite a los usuarios intercambiar y vender juegos de mesa, aprovechando tecnologías de **Amazon Web Services (AWS)** para ofrecer una solución segura y escalable.

## Características

- **Autenticación segura** con **AWS Cognito**.
- **Publicación de juegos de mesa** con detalles e imágenes.
- **Búsqueda y filtrado avanzado** de juegos.
- **Almacenamiento** de imágenes en **Amazon S3**.
- **Gestión de datos** mediante **DynamoDB** (base de datos NoSQL).
- **Seguridad** con **IAM**, **WAF** y **CloudTrail**.
- **Monitoreo de costos** con **CloudWatch** para evitar exceder la capa gratuita de AWS.
- **Escalabilidad** utilizando **Auto Scaling** para manejar picos de demanda.

## Propósito de Aprendizaje

Este proyecto tiene como objetivo **poner en práctica** las habilidades adquiridas en el curso de AWS Practitioner, explorando servicios como **AWS Cognito**, **DynamoDB**, **S3**, y **API Gateway**. A través de este desarrollo, busco consolidar mis conocimientos en la arquitectura en la nube, la seguridad de la información, y la escalabilidad de aplicaciones utilizando AWS.

## Tecnologías utilizadas

- **AWS Amplify**: Para la configuración del frontend.
- **AWS Cognito**: Para autenticación de usuarios.
- **Amazon S3**: Para almacenamiento de imágenes.
- **DynamoDB**: Base de datos NoSQL para almacenar datos de juegos y usuarios.
- **AWS Lambda**: Para ejecutar funciones backend sin servidor.
- **API Gateway**: Para manejar la comunicación entre frontend y backend.
- **CloudWatch**: Para monitoreo de costos y rendimiento.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/HugoBrandonHc/proyecto-juegos-de-mesa.git cd proyecto-juegos-de-mesa

2. Configurar el entorno de AWS:
- Configurar AWS Amplify para el frontend.
- Configurar AWS Cognito para la autenticación de usuarios.
- Configurar Amazon S3 para el almacenamiento de imágenes.
- Configurar DynamoDB para la base de datos.

3. Instalar dependencias:

   ```bash
   npm install
   
4. Ejecutar el proyecto localmente:

   ```bash
   npm start

## Uso
- **Registro de usuarios**: Los usuarios pueden registrarse con su correo electrónico y contraseña mediante AWS Cognito.
- **Publicación de juegos**: Los usuarios pueden añadir detalles y subir imágenes de los juegos que desean vender o intercambiar.
- **Búsqueda y filtrado**: Los usuarios pueden buscar juegos por nombre, categoría o estado.

## Licencia

Este proyecto está licenciado bajo los términos de la **Licencia MIT**. Esto significa que eres libre de utilizar, modificar y distribuir el código, siempre y cuando se incluya una copia del aviso de la licencia en cualquier redistribución.

Para más detalles, puedes consultar el archivo [LICENSE](LICENSE.md) en este repositorio.

## Contacto

Para más información o preguntas, puedes contactarme en [hugobrandon17@gmail.com](mailto:hugobrandon17@gmail.com) o visitar mi perfil de [LinkedIn](https://www.linkedin.com/in/hugobrandonhuaytacortez).


