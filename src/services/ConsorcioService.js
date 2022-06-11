import Consorcio from "../entities/Consorcio.js";
import Consorcista from "../entities/Consorcista.js";
import StellarService from '../services/StellarService.js'
import Repository from '../repository/Repository.js'

export default class ConsorcioService {

  constructor() {
    this.stellarService = new StellarService();
    this.repository = new Repository();
  }

  async create(dataConsorcio) {
    console.log("ConsorcioService.create");
    try {
      const { name, consorcistas } = dataConsorcio;

      // const consorcioId = generateId(name)

      /** SE CREAN INSTANCIAS Concorcistas SEGÚN LOS DATOS DEL FORM */
      const consorcista1 = new Consorcista('1cons' + '1', consorcistas[0].depto, consorcistas[0].vt);
      const consorcista2 = new Consorcista('2cons' + '1', consorcistas[1].depto, consorcistas[1].vt);

      /** SE CREAN LAS CUENTAS PARA LOS CONSORCISTAS */
      const consorcista1SAccount = await this.stellarService.createKeypair(consorcista1.id);
      const consorcista2SAccount = await this.stellarService.createKeypair(consorcista2.id);

      /** SE AGREGAN LAS CUENTAS DE STELLAR A CONSORCISTAS */
      consorcista1.setStellarAccount(consorcista1SAccount);
      consorcista2.setStellarAccount(consorcista2SAccount);

      /** SE CREA LA INSTANCIA Concorcio SEGÚN LOS DATOS DEL FORM */
      const consorcio = new Consorcio('1', name);

      /** SE CREA LA CUENTA STELLAR PARA EL CONSORCIO */
      const consorcioSAccount = await this.stellarService.createKeypair(consorcio.id);

      /** SE AGREGA LA CUENTA DE STELLAR A CONSORCIO */
      consorcio.setStellarAccount(consorcioSAccount);

      /** SE AGREGAN LOS CONSORCISTAS A CONSORCIO */
      consorcio.addConsorcista(consorcista1);
      consorcio.addConsorcista(consorcista2);


      await this.stellarService.createAccount(consorcio.account);

      //for
      await this.stellarService.createAccount(consorcista1.account);
      await this.stellarService.createAccount(consorcista2.account);

      await this.repository.saveConsorcio(consorcio)

    
    } catch (error) {
      console.log(error);
    }



  }







}

