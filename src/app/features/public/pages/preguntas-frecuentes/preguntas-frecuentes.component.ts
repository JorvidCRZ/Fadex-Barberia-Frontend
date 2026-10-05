import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreguntasFrecuentesComponent {
  readonly preguntas = [
    {
      pregunta: '¿Cómo puedo reservar una cita?',
      respuesta: 'Ingresa a la sección Reservas, selecciona el servicio, el barbero y el horario disponible. Luego confirma la reserva con tu cuenta.',
    },
    {
      pregunta: '¿Puedo cancelar o reprogramar mi cita?',
      respuesta: 'Sí. Comunícate con nosotros con anticipación para revisar las opciones disponibles y liberar el horario reservado.',
    },
    {
      pregunta: '¿Necesito crear una cuenta para comprar?',
      respuesta: 'Puedes explorar el catálogo sin registrarte. Para completar una compra o gestionar tus reservas necesitarás iniciar sesión.',
    },
    {
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Los métodos disponibles se muestran durante el proceso de compra y pueden variar según el tipo de pedido.',
    },
    {
      pregunta: '¿Cómo recupero mi contraseña?',
      respuesta: 'En la pantalla de inicio de sesión selecciona “Recuperar”. Ingresa tu correo y sigue las instrucciones del enlace recibido.',
    },
    {
      pregunta: '¿Cómo puedo contactar a Fadex Barber?',
      respuesta: 'Puedes utilizar nuestros canales oficiales de atención o registrar una solicitud desde la sección de contacto de la plataforma.',
    },
  ];
}
