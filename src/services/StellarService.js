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
        const entityAccountKp = Keypair.fromSecret(entityAccount.secret);

        const issuerAccount = await server.loadAccount(issuerKeyPair.publicKey());

        // const randomCode = assetCode + Math.floor(Math.random() * 1000).toString();
        const newAsset = new Asset(assetCode, issuerKeyPair.publicKey());

        const tx = new TransactionBuilder(issuerAccount, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: 'Test SDF Network ; September 2015',
        })
            .addOperation(Operation.changeTrust({
                source: entityAccount.publicKey,
                asset: newAsset,
            }))
            .addOperation(Operation.payment({
                amount: amount.toString(),
                asset: newAsset,
                destination: entityAccount.publicKey
            }))
            .setTimeout(30)
            .build();

        // Mostrar el XDR resultante en el laboratorio
        console.log(tx.toXDR());

        // Ambos necesitan firmar, el distribuidor porque está creando confianza...
        tx.sign(entityAccountKp);
        // ... y el issuer porque está pagando
        tx.sign(issuerKeyPair);

        try {
            const txResult = await server.submitTransaction(tx);
            console.log(txResult);
        } catch (e) {
            console.error(e);
        }

    };

    async makePayment(entityEmitAccount, entityReceiverAccount, amount, assetCode) {
        const emitAccountKp = Keypair.fromSecret(entityEmitAccount.secret);
        const receiverAccountKp = Keypair.fromSecret(entityReceiverAccount.secret);

        const emitAccount = await server.loadAccount(emitAccountKp.publicKey());

        const asset = new Asset(assetCode, issuerKeyPair.publicKey());

        const tx = new TransactionBuilder(emitAccount, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: 'Test SDF Network ; September 2015',
        })
            .addOperation(Operation.changeTrust({
                source: receiverAccountKp.publicKey(),
                asset: asset,
            }))
            .addOperation(Operation.payment({
                amount: amount.toString(),
                asset: asset,
                destination: receiverAccountKp.publicKey()
            }))
            .setTimeout(30)
            .build();

        // Mostrar el XDR resultante en el laboratorio
        console.log(tx.toXDR());

        // Ambos necesitan firmar, el distribuidor porque está creando confianza...
        tx.sign(receiverAccountKp);
        // ... y el issuer porque está pagando
        tx.sign(emitAccountKp);

        try {
            const txResult = await server.submitTransaction(tx);
            console.log(txResult);
        } catch (e) {
            console.error(e);
        }

    };

}
