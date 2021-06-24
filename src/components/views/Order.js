//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { OrderService } from '../../service/OrderService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from 'react-router-dom'

  import Product from "./Product";

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Order extends Component{
  constructor(){
    super();
    this.showSuccess = this.showSuccess.bind(this);
    this.state = {
      visible : false,
      order: {
      id : null ,
		  status : null ,
		  createAt : null ,
		  customer : null ,
		  taxesAmounts : 32.5 ,
		  totalTaxes : 40 ,
		  totalAmount : 41 ,
		  items : null 
      },
      selectedOrder: {

      }
    };
    this.items = [
      {
      label : 'Create Order',
      icon  : 'pi pi-fw pi-plus',
      command : () =>{this.showSaveDialog()}
    },
    {
      label : 'Edit',
      icon  : 'pi pi-fw pi-pencil',
      command : () =>{this.showEdit()}
    },
    {
      label : 'Delete',
      icon  : 'pi pi-fw pi-trash',
      command : () =>{this.delete()}
    }
    ,
    {
      label : 'Add Items',
      icon  : 'pi pi-fw pi-link',
      command : () =>{alert('add items' + ' '+ this.state.selectedOrder.id)}
    }

    ];
    this.ordenService = new OrderService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this)
  

    this.footer = (
      <div>
      <Button label="Save" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    this.save = (
      <div>
      <Button label="Create Order" icon="pi pi-check" onClick={this.showSaveDialog()} />
      </div>
    );

   
  
  }

  
  
  componentDidMount(){
    this.ordenService.getAll().then(data => this.setState({order: data}));
    // this.setState({
    //   visible : false,
    //   order: {
    //   id : null ,
		//   status : null ,
		//   createAt : null ,
		//   customer : null ,
		//   taxesAmounts : 32.5 ,
		//   totalTaxes : 40 ,
		//   totalAmount : 41 ,
		//   items : null 
    //   }
    // });

    
  }

  save(){
    this.ordenService.save(this.state.order).then(data =>{
     
      this.setState({
      visible : false,
      order: {
      id : null ,
		  status : null ,
		  createAt : null ,
		  customer : null ,
		  taxesAmounts : 32.5 ,
		  totalTaxes : 40 ,
		  totalAmount : 41 ,
		  items : null 
      }
     });
     this.showSuccess()
     // this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
    //this.toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
     this.ordenService.getAll().then(data => this.setState({order: data}));
    })
  }
  showSuccess() {
    this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
}

  delete(){
    if ( !this.state.selectedProduct.id){
      alert('you must select a record')
       return
    }
    if(window.confirm("¿Realy your confirm delete the regis?")){
        this.ordenService.delete(this.state.selectedOrder.id).then(
          data =>{
            this.ordenService.getAll().then(data => this.setState({order: data}));
          }
        )
    }
  }
  render(){
    return (
     
      <div style={{width:'90%', margin: '0 auto', marginTop: '20px'}}>
        
          
       
      <Panel header="BLAZE" >
      
      <Menubar model={this.items} start={<InputText placeholder="Search" type="text"/>} end={ <Link to="/product">Products</Link>}/>
        <h1>Orders </h1>
        <div style={{float: 'right', margin: '1em'}} ></div>
         <DataTable value={this.state.order} 
           paginator={true} rows="4" selectionMode="single"
          selection={this.state.selectedOrder} onSelectionChange={e => this.setState({selectedOrder: e.value})}>
           <Column field="id" key="id" header="N°"></Column>
           <Column field="customer" header="Consumer"></Column>
           <Column field="status" header="Status"></Column>
           <Column field="createAt" header="Date"></Column>
           <Column field="totalAmount" header="Total"></Column>
           
        </DataTable>
      </Panel>
        <Dialog footer={this.footer} header="Order" visible={this.state.visible} style={{width: '400px'}} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="form-order">
        <span className="p-float-label">
        <InputText value={this.state.order.id} style={{width : '100%'}} id="id" onChange={(e) => {
         
         let val = e.target.value
         this.setState(prevState => {
          //console.log('es: ',val)
           let order = Object.assign({}, prevState.order);
                            order.id = val
                        console.log('es id: ',order.id)
                        return { order };
         })}} />
        <label htmlFor="id">ID</label>
        </span>
         <br/>
        <span className="p-float-label">
        <InputText value={this.state.order.status} style={{width : '100%'}} id="status" onChange={(e) => {
          let val = e.target.value
          this.setState(prevState => {
                    
           let order = Object.assign({}, prevState.order);
                          order.status = val
                        console.log('es status: ',order.status)
                        return { order };
         })}} />
        <label htmlFor="status">Status</label>
        </span>
        <br/>
        <span className="p-float-label">
        <InputText value={this.state.order.createAt} style={{width : '100%'}} id="createAt" onChange={(e) => {
          let val = e.target.value
          this.setState(prevState => {
                    
           let order = Object.assign({}, prevState.order);
                            order.createAt = val
                        console.log('es createAt: ',order.createAt)
                        return { order };
         })} } />
        <label htmlFor="createAt">Date</label>
        </span>
        <br/>
        <span className="p-float-label">
        <InputText value={this.state.order.customer} style={{width : '100%'}} id="customer" onChange={(e) => {
          let val = e.target.value
          this.setState(prevState => {
                    
           let order = Object.assign({}, prevState.order);
                              order.customer = val
                        console.log('es customer: ',order.customer)
                        return { order };
         })} }/>
        <label htmlFor="customer">Consumer</label>
        </span>

        <Toast ref={(el) => this.toast = el} />
        </form>
        </Dialog>
        
      </div>
    );
  }
  showSaveDialog(){
    this.setState({
      visible : true,
      order: {
        id : null ,
        status : null ,
        createAt : null ,
        customer : null ,
        taxesAmounts : 32.5 ,
        totalTaxes : 40 ,
        totalAmount : 41 ,
        items : {
          id : 4 ,
		    name : " " ,
		    uniPrice : null
        }
        }
    })
  }

  showEdit(){
    if ( !this.state.selectedOrder.id){
      alert('you must select a record')
       return
    }
    this.setState({
      visible: true,
      order: {
        id : this.state.selectedOrder.id ,
        status : this.state.selectedOrder.status ,
        createAt : this.state.selectedOrder.createAt ,
        customer : this.state.selectedOrder.customer,
        taxesAmounts : 32.5 ,
        totalTaxes : 40 ,
        totalAmount : 41 ,
        items : {
          id : 4 ,
		    name : "cokes" ,
		    uniPrice : 12
        }
        }
    })
  }
}