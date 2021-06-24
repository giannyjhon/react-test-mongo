//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { ProductService } from '../../service/ProductService';
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

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Product extends Component{
  constructor(){
    super();
    this.showSuccess = this.showSuccess.bind(this);
    this.state = {
      visible : false,
    product: {
      id : null ,
		  name : null ,
		  category : null ,
		  uniPrice : null, 
		  active : null
      },
      selectedProduct: {

      }
    };
    this.items = [
      {
      label : 'Create Product',
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
    // ,
    // {
    //   label : 'Products',
    //   icon  : 'pi pi-fw pi-link',
    //   command : () =>{alert('navegate')}
    // }

    ];
    this.productService = new ProductService();
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
    this.productService.getAll().then(data => this.setState({product: data}));
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
    this.productService.save(this.state.product).then(data =>{
     
      this.setState({
      visible : false,
      product: {
        id : null ,
        name : null ,
        category : null ,
        uniPrice : null ,
        active : null 
        
        }
     });
     this.showSuccess()
     // this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
    //this.toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
     this.productService.getAll().then(data => this.setState({product: data}));
     
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
        this.productService.delete(this.state.selectedProduct.id).then(
          data =>{
            this.productService.getAll().then(data => this.setState({product: data}));
          }
        )
    }
  }
  render(){
    return (
     
      <div style={{width:'90%', margin: '0 auto', marginTop: '20px'}}>
        
      <Panel header="BLAZE" >
      
      <Menubar model={this.items} start={<InputText placeholder="Search" type="text"/>} end={ <Link to="/">Orders</Link>}/>
        <h1>Product</h1>
        <div style={{float: 'right', margin: '1em'}} ></div>
         <DataTable value={this.state.product} 
           paginator={true} rows="4" selectionMode="single"
          selection={this.state.selectedProduct} onSelectionChange={e => this.setState({selectedProduct: e.value})}>
           <Column field="id" key="id" header="N°"></Column>
           <Column field="name" header="Name"></Column>
           <Column field="category" header="Category"></Column>
           <Column field="uniPrice" header="UniPrice"></Column>
           <Column field="active" header="Active"></Column>
           
        </DataTable>
      </Panel>
        <Dialog footer={this.footer} header="Product" visible={this.state.visible} style={{width: '400px'}} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="form-order">
        <span className="p-float-label">
        <InputText value={this.state.product.id} style={{width : '100%'}} id="id" onChange={(e) => {
         
         let val = e.target.value
         this.setState(prevState => {
          //console.log('es: ',val)
           let product = Object.assign({}, prevState.product);
                            product.id = val
                        console.log('es id: ',product.id)
                        return { product };
         })}} />
        <label htmlFor="id">ID</label>
        </span>
         <br/>
        <span className="p-float-label">
        <InputText value={this.state.product.name} style={{width : '100%'}} id="name" onChange={(e) => {
          let val = e.target.value
          this.setState(prevState => {
                    
           let product = Object.assign({}, prevState.product);
                          product.name = val
                        console.log('es status: ',product.name)
                        return { product };
         })}} />
        <label htmlFor="status">Name</label>
        </span>
        <br/>
        <span className="p-float-label">
        <InputText value={this.state.product.category} style={{width : '100%'}} id="category" onChange={(e) => {
          let val = e.target.value
          this.setState(prevState => {
                    
           let product = Object.assign({}, prevState.product);
                            product.category = val
                        console.log('es category: ',product.category)
                        return { product };
         })} } />
        <label htmlFor="category">Category</label>
        </span>
        <br/>
        <span className="p-float-label">
        <InputText value={this.state.product.uniPrice} style={{width : '100%'}} id="uniPrice" onChange={(e) => {
          let val = e.target.value
          this.setState(prevState => {
                    
           let product = Object.assign({}, prevState.product);
                              product.uniPrice = val
                        console.log('es uniPrice: ',product.uniPrice)
                        return { product };
         })} }/>
        <label htmlFor="uniPrice">Uni Price</label>
        </span>
        <br/>
        {/* <span className="p-float-label">
        <InputText value={this.state.product.active} style={{width : '100%'}} id="active" onChange={(e) => {
          let val = e.target.value
          this.setState(prevState => {
                    
           let product = Object.assign({}, prevState.active);
                              product.active = val
                        console.log('es uniPrice: ',product.active)
                        return { product };
         })} }/>
        <label htmlFor="uniPrice">Active</label>
        </span> */}

        <Toast ref={(el) => this.toast = el} />
        </form>
        </Dialog>
      </div>
    );
  }
  showSaveDialog(){
    this.setState({
      visible : true,
      product: {
        id : null ,
        name : null ,
        category : null ,
        uniPrice : null 
        //Active : null ,
        
        }
    })
  }

  showEdit(){

    if ( !this.state.selectedProduct.id){
      alert('you must select a record')
       return
    }
    this.setState({
      visible: true,
      product: {
        id : this.state.selectedProduct.id ,
        name : this.state.selectedProduct.name ,
        category : this.state.selectedProduct.category ,
        uniPrice : this.state.selectedProduct.uniPrice
       // Active : this.selectedProduct.Active ,
        
        }
      
    })
  }
}