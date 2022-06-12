import { Server, Keypair, TransactionBuilder, Operation, Asset } from 'stellar-sdk'
import StellarAccount from '../entities/StellarAccount.js';
import issuerKeyPair from './issuer.js'

const server = new Server("https://horizon-testnet.stellar.org");

export default class StellarService {

    async createKeypair(id) {
        const kp = Keypair.random();
        return new StellarAccount(id, kp.publicKey(), kp.secret());
    }

    async createAccount(entityAccount, initialAmount = '10') {
        console.log('entre')
        const issuerAccount = await server.loadAccount(issuerKeyPair.publicKey());

        const tx = new TransactionBuilder(issuerAccount, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: 'Test SDF Network ; September 2015',
        })
            .addOperation(Operation.createAccount({
                destination: entityAccount.publicKey,
                startingBalance: initialAmount
            }))
            .setTimeout(30)
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



    async issueAnAsset(entityAccount, amount, assetCode) {
        const receiverKp = Keypair.fromSecret(receiver.secret);

        const issuerAccount = await server.loadAccount(issuerKeyPair.publicKey());
        // const receiverAccount = await server.loadAccount(receiverKp.publicKey());

        const randomCode = "CONS" + Math.floor(Math.random() * 1000).toString();
        const token = new Asset(randomCode, issuerKeyPair.publicKey());

        const tx = new TransactionBuilder(issuerAccount, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(Operation.changeTrust({
                source: receiverKp.publicKey(),
                asset: token,
            }))
            .addOperation(Operation.payment({
                amount: "8000", //calcular() ||
                asset: token,
                destination: receiverKp.publicKey()
            }))
            .setTimeout(180)
            .build();

        // Mostrar el XDR resultante en el laboratorio
        console.log(tx.toXDR());

        // Ambos necesitan firmar, el distribuidor porque está creando confianza...
        tx.sign(receiverKp);
        // ... y el issuer porque está pagando
        tx.sign(issuerKeyPair);

        try {
            const txResult = await server.submitTransaction(tx);
            console.log(txResult);
        } catch (e) {
            console.error(e);
        }

    };






}