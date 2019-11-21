import React from "react";
import './style.css'
class FormComponent extends React.Component{
	constructor(){
		super();
		this.state={
			name:"",
			age:"",
			sex:"nu",
			address:"",
			errName :"",
			errAge:"",
			errAddr:"",
		};
		this.pressKey = this.pressKey.bind(this);
		this.chuanHoaten = this.chuanHoaten.bind(this);
		this.checkDate = this.checkDate.bind(this);
		this.submit = this.submit.bind(this);
		this.onblur = this.onblur.bind(this);
		this.onchange = this.onchange.bind(this);
	}
	onblur(e){
		if(e.target.name == "name"){
			let newName = this.chuanHoaten(e.target.value);
			this.setState({name: newName});
		}
	}
	pressKey(e,nextFocus){
		if(e.keyCode ==13){
			this.refs[nextFocus].focus();
		}
	}
	submit(e){
		var errName = "";
		var errAge="";
		var errAddr="";
		if(this.state.name==""){
			errName="Bạn chưa điền tên";
		}
		if(this.state.age ==""){
			errAge="Bạn chưa điền ngày sinh ";
		}
		else{ 
			if(!this.checkDate(this.state.age)){
				errAge = "Vui lòng kiểm tra lại ngày sinh";
			}
		}
		if(this.state.address ==""){
			errAddr="Bạn chưa điền địa chỉ";
		}
		this.setState({
			errName: errName,
			errAge: errAge,
			errAddr: errAddr,
		});
	}
	onchange(e){
		name = e.target.name;
		this.setState({[name]: e.target.value});
	}
	chuanHoaten(oldName){
		let newName="";
		if(oldName != ""){
			let name = oldName.trim();
			name = oldName.replace(/\s+/g,' ');
			newName = name[0].toUpperCase();
			let i =0;
			for(i = 1;i < name.length;i++){
				if(name[i-1] == " "){
					newName +=name[i].toUpperCase();
				}
				else{
					newName += name[i].toLowerCase();
				}
			}
			return newName;
		}
		return newName;
	}
	checkDate(date){
		var item = date.replace(/\s/g,"");
		var dates = item.split("/");
		var num = []
		if(dates.length == 3){
			var i = 0;
			for(i=0; i<3;i++){
				num[i] = Number(dates[i]);
				if(isNaN(num[i])){
					return false;
				}
			}
		}
		if(num[2]>=1000 && num[2]< 2020){
			if(num[1] >=1 && num[1]<=12){
				if(num[0]>=1 && num[0] <= 31){
					switch(num[1]){
						case 1,3,5,7,8,10,12:{
							if( num[0] > 31){
								return false;
							}
						}
						case 4,6,9,11:{
							if(num[0] > 30){
								return false;
							}
						}
						default:{
							if(num[2]%400 == 0 || ((num[2]%4)==0 && (num[2]%100)!=0)){
								if(num[0] >29){
									return false;
								}
							} else{
								if(num[0]>28){
									return false;
								}
							}
						}
					}
					return true;
				}
			}
		}
		return false;
		console.log(num);
	}
	componentDidMount(){
		this.refs.name.focus();
	}
	render(){
		return(
			<form className= "FormComponent">
				<div>
					<label>Tên: </label>
					<input name="name" ref="name" onKeyDown={(e)=>this.pressKey(e,"age")} onChange={(e)=>this.onchange(e)} value={this.state.name} onBlur={this.onblur}/>
					<span className="error">{this.state.errName}</span>
				</div>
				<div>
					<label>Ngày sinh: </label>
					<input name="age" ref="age" onKeyDown={(e)=>this.pressKey(e,"address")}  onChange={(e)=>this.onchange(e)} value={this.state.age}/>
					<span className="error">{this.state.errAge}</span>
				</div>
				<div>
					<label>Địa chỉ: </label>
					<input name="address" ref="address"  onChange={(e)=>this.onchange(e)} value={this.state.address}/>
					<span className="error">{this.state.errAddr}</span>
				</div>
				<div>
					<label>Giới tính: </label>
					<select value={this.state.sex} onChange={(e)=>this.onchange(e)} name="sex">
						<option value="nam">Nam</option>
						<option value="nu">Nữ</option>
					</select>
				</div>
				<div><input type="button"value ="Chap nhan" onClick={this.submit}/></div>
			</form>)
	}

}

export default FormComponent;