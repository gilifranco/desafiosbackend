const request = require('supertest')('http://localhost:8080/api');
const expect = require('chai').expect;
const generador = require('../generador/productos');
const Product = require('../schemas/producto')

describe("test de integracion de productos", () => {

    before(function(){
        console.log('/n *********** comienzo TOTAL del test ***********')
    })

    describe("GET", ()=> {

        beforeEach(function(){
            console.log('/n *********** comienzo del test ***********')
        })

        //LEER LOS PRODUCTOS
        it("deberia dar un estado 302", async() => {
                request
                    .get('/productos')
                    .end((err, res) => {
                        expect(res.status).to.equal(302);
                    })
            })
        afterEach(function(){
                console.log('/n *********** final del test ***********')
            })    
        })



    //CREAR PRODUCTO
    describe("POST /api/crearproducto", () => {

        beforeEach(function(){
            console.log('/n *********** comienzo del test ***********')
        })

        it("deberia agregar un producto", (done) => {
            let producto = generador()
            request
                    .post('/api/crearproducto')
                    .send(producto)
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        if(err) return done(err);
                        expect(res.status).to.equal(302);
                        expect(res.body).to.have.property('nombre', 'zapatilla');
                        expect(res.body).to.have.property('precio', 200);
                        done();
                    })  
            

                })
                afterEach(function(){
                    console.log('/n *********** final del test ***********')
                })
        })

    describe("PUT", () => {
        
        let producto ;

        beforeEach(async(done) => {
            console.log('/n *********** comienzo del test ***********')
            try{
                producto = await new Product({ nombre: 'Producto de prueba', precio: 10 }).save();
                done()
            }catch(err){
                done(err)
            }
        })

        it("deberia actualizar un producto", async(done) => {

            const id = producto._id;
            const nuevosDatos = {
                nombre: 'nuevo nombre del producto',
                precio: 500
            }

            request
                .put(`/api/actualizarproducto/${id}`)
                .send(nuevosDatos)
                .end((err, res) => {
                    Product.findById(id, (err, producto) => {
                        if (err) {
                            return done(err);
                        } else {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            producto.should.have.property('nombre').eql(nuevosDatos.nombre);
                            producto.should.have.property('precio').eql(nuevosDatos.precio);
                            done();
                        }
                    })
                })

        })

        afterEach(async(done) => {
            console.log('/n *********** final del test ***********')
            try{
                await Product.findByIdAndDelete(producto._id)
                done()
            }catch(err){
                done(err)
            }
        })
    })

    describe("DELETE  /api/eliminarproducto/:id" , async() => {
        
        let producto;

        beforeEach(async (done)=> {
            console.log('/n *********** comienzo del test ***********')
            try{
                producto = await new Product({ nombre: 'Producto de prueba', precio: 10 }).save();
                done()
            }catch(err){
                done(err)
            }
        })

        it("deberia eliminar un producto", async(done) => {
            const res = await request.delete(`/eliminarproducto/${producto._id}`);

            expect(res.status).to.equal(204);
            expect(await Product.findById(producto._id)).to.be.null;
            done()
        })

        afterEach(async (done)=>{
            console.log('/n *********** final del test ***********')
            try{
                await Product.deleteOne(producto)
                done()
            }catch(err){
                done(err)
            }
        }) 
    })

    after(function(){
        console.log('/n *********** final TOTAL del test ***********')
    })        
    
})
