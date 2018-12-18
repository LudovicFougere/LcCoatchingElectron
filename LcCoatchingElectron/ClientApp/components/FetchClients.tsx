import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface FetchClientExampleState {
    clients: Client[];
    loading: boolean;
}

export class FetchClients extends React.Component<RouteComponentProps<{}>, FetchClientExampleState> {
    constructor() {
        super();
        this.state = { clients: [], loading: true };

        fetch('api/Clients/GetAllClients')
            .then(response => response.json() as Promise<Client[]>)
            .then(data => {
                this.setState({ clients: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchClients.renderForecastsTable(this.state.clients);

        return <div>
            <h1>Clients</h1>
            {contents}
        </div>;
    }

    private static renderForecastsTable(clientListe: Client[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>ClientId</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>DateNaissance</th>
                    <th>Genre</th>
                    <th>Taille</th>
                    <th>Poids</th>
                    <th>Projet</th>
                </tr>
            </thead>
            <tbody>

                {clientListe.map(c =>
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.nom}</td>
                        <td>{c.prenom}</td>
                        <td>{c.email}</td>
                        <td>{c.telephone}</td>
                        <td>{c.dateNaissance}</td>
                        <td>{c.genre}</td>
                        <td>{c.taille}</td>
                        <td>{c.poids}</td>
                        <td>{c.projet}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class Client {
    id: number = 0;
    nom: string = "";
    prenom: string = "";
    email: string = "";
    telephone: number = 0;
    dateNaissance: (new () => Date) | undefined;
    genre: string = "";
    taille: number = 0;
    poids: number = 0;
    projet: string = "";
}
