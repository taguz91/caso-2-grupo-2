import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const post of value){
      if((post.tipoServicio.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1) 
      || 
      (post.descripcion.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.servicio.nombre_servicio.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.criticidad.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.impacto.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.nivelPrioridad.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.tiempoResolucion.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.tiempoRespuesta.toLowerCase().indexOf(args.toLowerCase()) > -1)
      ||
      (post.sla.reglasEscalada.toLowerCase().indexOf(args.toLowerCase()) > -1)
      ){
         resultPosts.push(post);
      }
    };
    return resultPosts;
  }

}
