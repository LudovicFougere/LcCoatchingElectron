import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { UserData } from './FetchUsers';

interface AddUserDataState {
    title: string;
    loading: boolean;
    userData: UserData;
}

export class AddUser extends React.Component<RouteComponentProps<any>, AddUserDataState> {
    constructor(props: any) {
        super(props);

        //this.state = { title: "", loading: true, userData: new UserData };

        //fetch('api/Employee/GetCityList')
        //    .then(response => response.json() as Promise<Array<any>>)
        //    .then(data => {
        //        this.setState({ cityList: data });
        //    });

        var empid = this.props.match.params["userid"];

        // This will set state for Edit employee 
        if (empid > 0) {
            fetch('api/User/Details/' + empid)
                .then(response => response.json() as Promise<UserData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, userData: data });
                });
        }

         //This will set state for Add employee 
        else {
            this.state = { title: "Create", loading: false, userData: new UserData };
        }

        // This binding is necessary to make "this" work in the callback 
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Employee</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event. 
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee. 
        if (this.state.userData.userId) {
            fetch('api/User/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchusers");
                })
        }

        // POST request for Add employee. 
        else {
            fetch('api/User/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchusers");
                })
        }
    }

    // This will handle Cancel button click event. 
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/fetchusers");
    }

    // Returns the HTML Form to the render() method. 
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="userId" value={this.state.userData.userId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Nom">Nom</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="nom" defaultValue={this.state.userData.nom} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Prenom">Prénom</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="prenom" defaultValue={this.state.userData.prenom} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Age">Age</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="age" defaultValue={this.state.userData.age} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Sexe">Sexe</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="sexe" defaultValue={this.state.userData.sexe} required>
                            <option value="">-- Select Gender --</option>
                            <option value="H">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="DateLimite">Date limite</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="dateLimite" required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}