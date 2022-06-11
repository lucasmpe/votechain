import { Server, Keypair, TransactionBuilder, Operation } from 'stellar-sdk'
import StellarAccount from '../entities/StellarAccount.js';
import issuerKeyPair from './issuer.js'

const server = new Server("https://horizon-testnet.stellar.org");

export default class StellarService {

    async createKeypair(id) {

        const kp = Keypair.random();

        return new StellarAccount(id, kp.publicKey(), kp.secret());
    }

    async createAccount(entityAccount, initialAmount) {

        const issuerAccount = await server.loadAccount(issuerKeyPair.publicKey());
     
        const tx = new TransactionBuilder(issuerAccount, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: 'Test SDF Network ; September 2015',
        })
            .addOperation(Operation.createAccount({
                destination: entityAccount.publicKey,
                startingBalance: initialAmount
            }))
            .setTimeout(180)
            .build();

        console.log(tx.toXDR());

        tx.sign(issuerKeyPair);

        try {
            const txResult = await server.submitTransaction(tx);
            console.log(txResult);
        } catch (e) {
            console.error(e);
        }

    };





}