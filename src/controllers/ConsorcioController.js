

export default class ConsorcioController {

    constructor() {
        this.consorcioService = consorcioService;
        
    }

    async save() {
        try {
          const dataConsorcio = map(req.body);
          const consorcio = consorcioService.create(dataConsorcio);
        

            //....

          res.redirect('/consorcio/:id')
        } catch (error) {
            console.log(error);
        }
    };

}


