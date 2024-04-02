import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import './tiposervicios.scss'

export const TipoServicios = () => {
  return (

    <div className='tipoServicios-ppal'>

      <div className='tipoServicios-titulo'>
        <h1>Tipo de Servicios</h1>
      </div>

      <div className='tipoServicio-seccion'>
        <div className='tituloServicio-seccion'>
          <h2><b>Operador de Cámara</b></h2>
        </div>
        <div className='bodyServicio-seccion'>
          <div className='imagenServicio-seccion'>
          <img className='img-fluid' src="/images/eventos.jpg" alt="" />
          </div>
          <div className='textoServicio-seccion'>
            <p>Servicio de operador de cámara profesional, livestream  y grabado en todo tipo de eventos en vivo, producciones audiovisuales(cortometrajes, peliculas, conciertos, bandas...) transmisión remota, realización en directo. Manejo y configuración de mochilas LIVE-U y similares</p>
            <Button>Contactar</Button>
          </div>          
        </div>
      </div>

      <div className='tipoServicio-seccion'>
        <div className='tituloServicio-seccion'>
          <h2><b>Auxiliar de Producción de Eventos</b></h2>
        </div>
        <div className='bodyServicio-seccion'>
          <div className='imagenServicio-seccion'>
          <img  className='img-fluid' src="/images/eventos.jpg" alt="" />
          </div>
          <div className='textoServicio-seccion'>
            <p>Ofrecemos servicios de asistencia a la producción de eventos y montajes,, transporte y colocación de equipos audiovisuales. Stock, almacén, manejo de máquinas elevadoras autopropulsadas e instalación de equipos audiovisuales. </p>
            <Button>Contactar</Button>
          </div>          
        </div>
      </div>

      <div className='tipoServicio-seccion'>
        <div className='tituloServicio-seccion'>
          <h2><b>Editor de Video</b></h2>
        </div>
        <div className='bodyServicio-seccion'>
          <div className='imagenServicio-seccion'>
          <img className='img-fluid' src="/images/eventos.jpg" alt="" />
          </div>
          <div className='textoServicio-seccion'>
            <p>Servicios profesionales de Montaje y Postproducción Audiovisual, manejo de programas de la suite adobe (premiere pro, photoshop, media encoder, affter effects) Da Vinci, etc...</p>
            <Button>Contactar</Button>
          </div>          
        </div>
      </div>

      <div className='tipoServicio-seccion'>
        <div className='tituloServicio-seccion'>
          <h2><b>Técnico de Video para Espectáculos</b></h2>
        </div>
        <div className='bodyServicio-seccion'>
          <div className='imagenServicio-seccion'>
          <img className='img-fluid' src="/images/eventos.jpg" alt="" />
          </div>
          <div className='textoServicio-seccion'>
            <p>Tenemos dentro de nuestra carrtera de servicios la sistencia comoTécnico Audiovisual con especialidad de Video de Espectáculos. Vídeo LED, proyectores, montaje y configuración (software novastar, watchout, control de equipos, resolución de incidencias técnicas...)</p>
            <Button>Contactar</Button>
          </div>          
        </div>
      </div>

    </div>
  )
}
