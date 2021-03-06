# votechain
Proyecto sobre la red Stellar para el hackathon de r/argentina-programa.
## install 馃敡
``` npm install ```

## run
``` npm run start ```
## Uso
Para probar la app con sus funcionalidades b谩sicas puede usar estos [requests](https://www.getpostman.com/collections/26a9902f313e7e486e86).

Tambi茅n puede visualizar una versi贸n demo [aqu铆](https://votechain-app.herokuapp.com/).

## Declaraci贸n

Sistema de votaciones online, dirigido a las administraciones de consorcios de edificio, que permite resolver de forma 谩gil la toma de decisiones en relaci贸n a propuestas que podr铆an ser derivadas ya sea de asambleas, iniciativas de consorcistas individuales o grupales, o directamente de la administraci贸n del consorcio. El sistema busca **fomentar la participaci贸n** de los vecinos y lograr **mayor transparencia** sobre las acciones que llevan a cabo los consorcios.

### Ejemplos de uso:

- Definir un cierto aumento en el valor de las expensas dirigido al gasto en mantenimiento del parque (origen: administraci贸n).
- Definir un proveedor de cierto servicio imprescindible para el mantenimiento de las instalaciones (origen: asamblea). Ej.: calderista, plomero, electricista, etc.
- Definir una necesidad para que sea objeto de votaci贸n (origen: consorcista/s).


### L脫GICA DE NEGOCIO

- Una vez formulada una propuesta, el consorcio se encargar谩 de publicarla para dar inicio a la votaci贸n.

- Si bien el consorcio podr铆a publicar m谩s de una propuesta y que las votaciones respectivas convivan en un mismo per铆odo de tiempo, provocando la existencia de votaciones simult谩neas, por el momento y por simplicidad el consorcio quedar谩 restringido a la acci贸n de publicar solo una propuesta a la vez, logrando as铆 la existencia de una 煤nica votaci贸n abierta por vez.

- Por cada votaci贸n se generar谩n tantos assets como opciones de voto tenga la votaci贸n.
     - Cada consorcista puede tener un peso determinado en la votaci贸n (por ejemplo, por los m2 de la unidad de la que es responsable). Lo que se traduce en m谩s valores de voto.
     - Los consorcistas pueden estar o no habilitados para participar en la votaci贸n.
     - Cada votaci贸n podr谩 requerir, dependiendo la propuesta, un m铆nimo de consorcistas participantes para que sea considerada v谩lida.
     - Cada votaci贸n tendr谩 un tiempo de finalizaci贸n.

- Sobre una votaci贸n particular, los consorcistas tendr谩n la posibilidad de votar diferentes opciones usando parte de los valores de voto que les fueron otorgados.
     - Podr谩n votar m谩s de una vez, en tanto dispongan de 鈥渟aldo鈥? y el tiempo de finalizaci贸n de la votaci贸n no se haya alcanzado.
     - Solo podr谩n votar una 煤nica vez una opci贸n.
     - Una vez que se haya realizado un voto, tal acci贸n no podr谩 deshacerse.

- Finalizada la votaci贸n
     - Los assets generados para la propuesta que fue votada quedan en desuso.
     - Si la votaci贸n es considerada v谩lida se emitir谩n los resultados. De lo contrario, se expondr谩n los motivos de la invalidez.



### Secuencia b谩sica del sistema

1. Un cliente consorcio entra a la app y se **registra**.
    - Se crea una *Consorcio* y tantos *Consorcistas* como hayan sido declarados en el registro.
    - Se crean las respectivas *cuentas de Stellar* correspondientes a cada instancia de Consorcio y Consorcista.

2. Un cliente consorcio crea una **votaci贸n/encuesta** dirigida a los consorcistas registrados en su cuenta.
    - Se procesan los datos y se crea una *Votaci贸n*.
    - Se depositan en la cuenta Stellar del consorcio las cantidades necesarias de los assets creados espec铆ficamente para ser utilizados como *valores de votos* en esta votaci贸n. Se crean tantos assets como opciones de voto tenga la votaci贸n.

                            cantidad de opciones * 危 vt = total assets emitidos 

3. Se **inicia la votaci贸n**.
    - Los consorcistas **ingresan** a la app para votar.
    - Un consorcista realiza un **voto** que puede ser pleno o parcial si existieran m谩s de dos opciones en la votaci贸n. Si el voto es parcial, a煤n poseer谩 *valores de voto* por lo que puede volver a votar.
    - Cada vez que se realice un voto se emitir谩 un pago desde la cuenta Stellar del consorcio a la cuenta Stellar del consorcista con la cantidad indicada del asset asociado a la opci贸n por la que se est谩 votando.

4. **Finaliza la votaci贸n**.
    - Se depositan (se queman) en la cuenta ISSUER todos los assets creados para la votaci贸n, emitiendo pagos desde las cuentas que al momento de finalizaci贸n tengan posesi贸n del asset.

5. Se muestran los **resultados** de la votaci贸n.







## Esquema b谩sico

![Esquema](./doc/secuencia-basica.png "Secuencia b谩sica")


## Autores

- **Gonzalo Altamirano** [GonzaloAlt](https://github.com/GonzaloAlt)
- **Lucas Perez** [lucasmpe](https://github.com/lucasmpe)
