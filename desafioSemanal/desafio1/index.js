class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros || [];
        this.mascotas = mascotas || [];
    }
    
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }

    countMascotas(){
        console.log(this.mascotas.length);
    }

    addBook(nombreLibro, nombreAutor){
        this.libros.push({nombre:nombreLibro, autor:nombreAutor});
    }

    getBookNames(){
        console.log(this.libros.map(x=>x.nombre));
    }
}

let usuario = new Usuario("Franco","Ramirez");

usuario.getFullName();
usuario.addMascota("Frida");
usuario.countMascotas();
usuario.addBook("El Pibe que arruinaba las fotos", "Hernan Casciari");
usuario.getBookNames();