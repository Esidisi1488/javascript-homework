**Read in other languages: [Русский](README.md), [Українська](README.ua.md),
[English](README.en.md), [Español](README.es.md), [Polski](README.pl.md).**

# Criterios de admisión

- Se ha creado el repositorio `goit-js-hw-09`.
- Al presentar los deberes, hay dos enlaces para cada proyecto: a la fuente
  y una página de trabajo en `GitHub Pages`.
- Al visitar la página de trabajos en vivo, no hay errores ni advertencias en la consola.
- El proyecto está construido con
  [parcel-project-template](https://github.com/goitacademy/parcel-project-template).
- El código es formateado por `Prettier`.

## Archivos de inicio

En la [carpeta src](./src) se encuentran los archivos de inicio con el diseño listo, los estilos y
archivos de script conectados para cada trabajo. Cópialos en tu proyecto,
reemplazando completamente la carpeta `src` en
[parcel-project-template](https://github.com/goitacademy/parcel-project-template).
Para ello, descargue este repositorio completo como un archivo o utilice
[servicio DownGit](https://downgit.github.io/) para descargar una carpeta individual del
depósito.

## Tarea 1 - cambio de color

Ejecute esta tarea en los archivos `01-color-switcher.html` y `01-color-switcher.js`.
Vea un vídeo de demostración del funcionamiento del interruptor.

https://user-images.githubusercontent.com/17479434/127716753-fabd276f-6a7d-411b-bfa2-01c818f4ea66.mp4

Hay botones de «Start» y «Stop» en HTML.

```html
<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>
```

Escribe un script que, tras pulsar el botón "Start", cambie el color del fondo del `<body>` una vez por segundo utilizando un estilo inline.
El color de fondo de `<body>` cambiará a un valor aleatorio utilizando el estilo inline.  Al pulsar la tecla
«Stop», el cambio de color de fondo debería detenerse.

> ⚠️ Ten en cuenta que el botón «Start» puede ser pulsado un número infinito de veces. Haga
> para que mientras se ejecute el cambio de tema, el botón «Start» esté inactivo
> (disabled).

Utilice la función `getRandomHexColor` para generar un color aleatorio.

```js
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
```

## Tarea 2 - Cuenta atrás

Ejecute esta tarea en los archivos `02-timer.html` y `02-timer.js`. Escribir un script
un temporizador que cuenta hasta una fecha determinada. Este temporizador podría
Este temporizador se puede utilizar en blogs y tiendas online, páginas de registro de eventos, durante
trabajos de mantenimiento, etc. Vea un vídeo de demostración del temporizador.

https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4

### Elementos de interconexión

El HTML tiene un diseño de temporizador predefinido, un campo de selección de la fecha de finalización y un botón que, al hacer clic, debe iniciar el temporizador.
para activar el temporizador. Añade un diseño mínimo
elementos de la interfaz.

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

### Biblioteca `flatpickr`

Utilice la biblioteca [flatpickr](https://flatpickr.js.org/) para
permiten al usuario multipliar la fecha y la hora de finalización en un solo
elemento de interfaz. Para poder introducir el código CSS de la biblioteca en el proyecto,
es necesario añadir otro importe además del descrito en la documentación.

```js
// Descrito en la documentación
import flatpickr from 'flatpickr';
// Importación adicional de estilos
import 'flatpickr/dist/flatpickr.min.css';
```

La biblioteca espera ser inicializada en el elemento `input[type="text"]`,
por lo que hemos añadido un campo `input#datetime-picker` al documento HTML.

```html
<input type="text" id="datetime-picker" />
```

El segundo argumento de la función `flatpickr(selector, options)` se puede pasar
un objeto parámetro opcional. Hemos preparado para ti el objeto que necesitas
para hacer el trabajo. Descubra qué hace cada propiedad en
[Documentación «Options»](https://flatpickr.js.org/options/) y utilizarlo en
su código.

```js
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
```

### Selección de fecha

El método `onClose()` del objeto parámetro es llamado cada vez que el
elemento de interfaz que crea el `flatpickr`. Aquí es donde debería manejar
fecha seleccionada por el usuario. El parámetro `selectedDates` es un array de fechas seleccionadas,
así que tomamos el primer elemento.

- Si el usuario ha seleccionado una fecha en el pasado, mostrar `window.alert()` con el texto
  `"Please choose a date in the future"`.
- Si el usuario ha seleccionado una fecha válida (en el futuro), el botón «Start» se convierte en
  activo.
- El botón «Start» no debe estar activo hasta que el usuario haya seleccionado
  fecha en el futuro.
- Al pulsar el botón «Start» se inicia la cuenta atrás hasta la fecha seleccionada de
  desde el momento en que se pulsa.

### Cuenta regresiva del tiempo

Cuando se pulsa el botón «Start», el script debe calcular una vez por segundo cuánto tiempo queda hasta
tiempo que queda hasta la fecha especificada y actualiza la interfaz del temporizador para mostrar
cuatro dígitos: días, horas, minutos y segundos en el formato `xx:xx:xx:xx`.

- El número de días puede constar de más de dos dígitos.
- El temporizador debe detenerse cuando llegue a la fecha de finalización, es decir
  `00:00:00:00`.

> 💡 Hagámoslo sencillo. Si el temporizador está en marcha, para seleccionar una nueva fecha
> y reiniciarlo - es necesario recargar la página.

Para calcular los valores, utilice la función preparada `convertMs`, donde `ms` es la diferencia
entre la fecha de finalización y la fecha actual en milisegundos.

```js
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
```

### Formato de tiempo

La función `convertMs()` devuelve un objeto con el tiempo restante calculado hasta
la fecha final. Tenga en cuenta que no formatea el resultado. Es decir, si hay
4 minutos o cualquier otro componente de tiempo, la función devolverá `4`,
no `04`. En la interfaz del temporizador, debe añadirse `0` si el número tiene menos de
dos personajes. Escriba una función `addLeadingZero(value)` que utilice el
`padStart()` y formatear el valor antes de renderizar el interframe.

### Biblioteca de notificaciones

> ⚠️ La siguiente funcionalidad no es obligatoria a la hora de entregar un trabajo, pero sería bueno
> práctica adicional.

Para mostrar notificaciones al usuario en lugar de `window.alert()` utilice
biblioteca [notiflix](https://github.com/notiflix/Notiflix#readme).

## Tarea 3 - Generador de promesas

Ejecute esta tarea en los archivos `03-promises.html` y `03-promises.js`. Ver
vídeo de demostración del generador de promesas.

https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4

El HTML tiene un diseño de formulario en el que el usuario introducirá la primera
retraso en milisegundos, el paso de incremento de retraso para cada promis después de
primero y el número de promesas a crear.

```html
<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>
```

Escriba un script que llame a la función  cuando se envíe el formulario
`createPromise(position, delay)` tantas veces como se haya introducido en el campo `amount`. En
cada vez que se llama, pasa el número del pagaré (`posición`) y el retraso
considerando el primer retardo (`delay`) y el paso (`step`) introducidos por el usuario.

```js
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
```

Completa el código de la función `createPromise` para que devuelva **una promesa**,
que se ejecuta o se rechaza después de un "retraso" de tiempo. El valor de la promesa
debe ser un objeto que tendrá las propiedades `position` y `delay` con valores de
parámetros del mismo nombre. Utilice el código inicial de la función para seleccionar lo que
hacer con la promesa: ejecutarla o rechazarla.

```js
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
```

### Biblioteca de notificaciones

> ⚠️ La siguiente funcionalidad no es obligatoria a la hora de entregar un trabajo, pero sería bueno
> práctica adicional.

Para mostrar notificaciones al usuario en lugar de `console.log()` utilice
biblioteca [notiflix](https://github.com/notiflix/Notiflix#readme).
