from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from datetime import datetime
from flask_bcrypt import Bcrypt
import json
from sklearn.externals import joblib
import pandas as pd
import numpy as np
from scipy.optimize import minimize
from sklearn.preprocessing import StandardScaler
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
import csv
import sys

flask_app = Flask(__name__)
app = Api(app = flask_app)

name_space = app.namespace('prediction', description='Prediction APIs')


#login data:
users=[]
with open("Login.csv") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
                users.append(row)
flask_app.config['JWT_SECRET_KEY'] = 'secret'
bcrypt = Bcrypt(flask_app)
jwt = JWTManager(flask_app)
model = app.model('Prediction params',{ 'BPL_entrant': fields.String(required = True),
                                        'CO2_entrant': fields.Float(required = True),
        'MgO_entrant': fields.Float(required = True),
        
        'Cd_entrant': fields.Float(required = True),
        'Débit_phosphate_brut_CV001': fields.Float(required = True),
        'Densité_PK03': fields.Float(required = True),
        'Pression_PK03': fields.Float(required = True),
        'Densité_PK04': fields.Float(required = True),
        'Dilution_HP04': fields.Float(required = True),
        'Pression_PK004':fields.Float(required = True),
        'Densité_PK05':fields.Float(required = True),
        'Dilution_HP05':fields.Float(required = True),
        'Pression_PK05': fields.Float(required = True),
        'Debit_air_cell_1': fields.Float(required = True),
        'Debit_air_cell_2': fields.Float(required = True),
        'Debit_air_cell_3': fields.Float(required = True),
        'Debit_air_cell_4': fields.Float(required = True),
        'Debit_air_cell_5': fields.Float(required = True),
        'Debit_air_cell_6': fields.Float(required = True),
        'Debit_air_cell_7': fields.Float(required = True),
        'Pression_PK23': fields.Float(required = True),})
model_optimisation = app.model('optimisations params',{ 'BPL_entrant': fields.String(required = True),
                                                        'CO2_entrant': fields.Float(required = True),
                                                        'MgO_entrant': fields.Float(required = True),
                                                        'Cd_entrant': fields.Float(required = True),
                                                        'BPL_sortant': fields.Float(required = True),
                                                        'CO2_sortant': fields.Float(required = True),
                                                        'MgO_sortant': fields.Float(required = True),
        })

loaded_model_BPL = joblib.load('model_BPL.joblib')
loaded_model_CO2 = joblib.load('model_CO2.joblib')
loaded_model_MgO = joblib.load('model_MgO.joblib')
loaded_model_lineaire_BPL = joblib.load('model_lineaire_BPL.joblib')
loaded_model_lineaire_CO2 = joblib.load('model_lineaire_CO2.joblib')
loaded_model_lineaire_MgO = joblib.load('model_lineaire_MgO.joblib')
data=pd.read_csv('C:/Users/user/Documents/GitHub/PFE/Back_end/Final_data.csv')
#bounds:
bounds= ((1216.571289, 1890.867432),
 (1095.490967, 1395.712158),
 (0.703576744, 1.507411361),
 (43831.29167, 43898.95417),
 (406.0654602, 1093.179321),
 (0.8575570579999999, 1.490989566),
 (1206.317261, 2664.3372611174027),
 (559.4415283, 1098.123169),
 (0.969695568, 1.329567313),
 (73.0, 132.0),
 (127.0, 420.0),
 (147.0, 447.0),
 (192.0, 552.0),
 (295.0, 622.0),
 (352.0, 696.0),
 (338.0, 765.0),
 (1.5940337180000002, 222.15392909595317))
        
X = data.drop(['Date','BPL_NF','CO2_NF','MgO_NF','Cd_NF_(ppm)'],1)
scaler = StandardScaler()
X_scaled = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			results = []
			data = [float(val) for val in formData.values()]
			results.append(float("{:.2f}".format(loaded_model_BPL.predict(scaler.transform([data]))[0])))
			results.append(float("{:.2f}".format(loaded_model_CO2.predict(scaler.transform([data]))[0])))
			results.append(float("{:.2f}".format(loaded_model_MgO.predict(scaler.transform([data]))[0])))
			
			
			
			
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": results
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as ex:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(ex)
			})
#multi_predictions
@name_space.route("/multiprediction")
class MainClass(Resource):
        def options(self):
                response = make_response()
                response.headers.add("Access-Control-Allow-Origin", "*")
                response.headers.add('Access-Control-Allow-Headers', "*")
                response.headers.add('Access-Control-Allow-Methods', "*")
                return response
        @app.expect(model)
        def post(self):
                try:
                        results = []
                        
                        
                        data = request.json
                        for form in data:
                                result = []
                                global key
                                key = form.get('key')
                                del form['key']
                                
                                data = [float(val) for val in form.values()]
                              #  result.append(key)
                               # result.append(loaded_model_BPL.predict([data])[0])
                                #result.append(loaded_model_MgO.predict([data])[0])
                                #result.append(loaded_model_CO2.predict([data])[0])
                                #results.append(result)
                                form['BPL_sortant']=float("{:.2f}".format(loaded_model_BPL.predict(scaler.transform([data]))[0]))
                                form['MgO_sortant']=float("{:.2f}".format(loaded_model_MgO.predict(scaler.transform([data]))[0]))
                                form['CO2_sortant']=float("{:.2f}".format(loaded_model_CO2.predict(scaler.transform([data]))[0]))
                                results.append(form)
                                
                                
                        
                        response = jsonify({
                                "statusCode": 200,
                                "status": "Prediction made",
                                "result": results
                                })
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                except Exception as ex:
                        return jsonify({
                                "statusCode": 500,
                                "status": "Could not make prediction",
                                "error": str(ex)
                                })
@name_space.route("/optimisations")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model_optimisation)		
	def post(self):
		try:
                       
                        #fonction objective:
                        def objective(x,BPL,CO2,MgO,Cd,BPL_sortant,CO2_sortant,MgO_sortant):
                                x1=x[0]
                                x2=x[1]
                                x3=x[2]
                                x4=x[3]
                                x5=x[4]
                                x6=x[5]
                                x7=x[6]
                                x8=x[7]
                                x9=x[8]
                                x10=x[9]
                                x11=x[10]
                                x12=x[11]
                                x13=x[12]
                                x14=x[13]
                                x15=x[14]
                                x16=x[15]
                                x17=x[16]
                                Y=np.array([[BPL,CO2,MgO,Cd,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17]])
                                Y=scaler.transform(Y)
                                bpl = loaded_model_lineaire_BPL.predict(Y)
                                MgO = loaded_model_lineaire_MgO.predict(Y)
                                CO2 = loaded_model_lineaire_CO2.predict(Y)
                                result = (BPL_sortant-bpl)**2+(MgO_sortant-MgO)**2+(CO2_sortant-CO2)**2
                                return result
                        
                        formData = request.json
                        data = [float(val) for val in formData.values()]
			#optimisation:
			  #valeur initianl d'optimisation:
                        p=[[1727.7790530000002,1269.8710939999999,1.301449656,43898.81528,500.3433228,1.413717866,1311.7875980000001,821.6067505,1.1767605540000001,79.0,342.0,340.0,397.0,484.0,594.0,642.0,2.50629425]]
                          #fonction d'optimisation:

                        solution = minimize(objective,x0=np.array(p),args=(data[0],data[1],data[2],data[3],data[4],data[5],data[6]),method='L-BFGS-B',bounds=bounds)
                        results = solution.x.tolist()
                        floated_results = [float("{:.2f}".format(data)) for data in results]
                        response = jsonify({"statusCode": 200,
                                "status": "Prediction made",
                                "result": floated_results})
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
		except Exception as ex:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(ex)
			})
@name_space.route("/login")
class MainClass(Resource):
        def options(self):
                response = make_response()
                response.headers.add("Access-Control-Allow-Origin", "*")
                response.headers.add('Access-Control-Allow-Headers', "*")
                response.headers.add('Access-Control-Allow-Methods', "*")
                return response
        def post(self):
                try:
                        email = request.json['email'].lower()
                        password = request.json['password']
                        result = ""
                        df=pd.read_csv('Login.csv')
                        
                        user = df[df['Email'].str.match(email)]
                        
                        
                        if (not user.empty):
                                
                                if (bcrypt.check_password_hash(user['Password'].tolist()[0], password)):
                                        
                                        
                                        
                                        access_token = create_access_token(identity = {'name': user['Name'].tolist()[0],
                                                                       'last_name': user['Last_name'].tolist()[0],
                                                                       'email': user['Email'].tolist()[0],
                                                                                       
                                                                       'role': user['Role'].tolist()[0]},
                                                                                   )
                                        result = jsonify({"token":access_token})
                                else:
                                        result = jsonify({"error":"Le mot de passe saisi est incorrect"})
                        else:
                                result = jsonify({"error":"Cet email n'existe pas"})
                        return result
                except Exception as ex:
                        return jsonify({
                                "error": str(ex)
                                        })
		
@name_space.route("/register")
class MainClass(Resource):
        def options(self):
                response = make_response()
                response.headers.add("Access-Control-Allow-Origin", "*")
                response.headers.add('Access-Control-Allow-Headers', "*")
                response.headers.add('Access-Control-Allow-Methods', "*")
                return response
        #not yet finished
        def post(self):
                try:
                        name = request.get_json()['name']
                        last_name = request.get_json()['last_name']
                        email = request.get_json()['email'].lower()
                        password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
                        role=request.get_json()['role']
                        created = datetime.utcnow().strftime('%d %B %Y - %H:%M:%S')
                        new_user = pd.DataFrame ({"Name":[name], "Last_name":[last_name],"Email":[email],"Password":[password],"Role":[role],"Created":[created]} )
                        df=pd.read_csv('Login.csv')
                        if (not df[df['Email'].str.match(email)].empty):
                                result = jsonify({"error":'Email saisi déjà existant'})
                        else:
                                df=df.append(new_user, ignore_index = True)
                                df.to_csv('Login.csv', index = False)
                                result = jsonify({'result': new_user['Email'].tolist()[0] + ' est enregistré avec succés'})
                        return result
                except Exception as ex:
                        return jsonify({"error": str(ex)})
		
@name_space.route("/users")
class MainClass(Resource):
        def options(self):
                response = make_response()
                response.headers.add("Access-Control-Allow-Origin", "*")
                response.headers.add('Access-Control-Allow-Headers', "*")
                response.headers.add('Access-Control-Allow-Methods', "*")
                return response
        #not yet finished
        def post(self):
                try:
                        permission = request.get_json()['permission']
                        if (permission):
                                df=pd.read_csv('Login.csv')
                                data = df.to_dict('records')
                                result = jsonify({"result":data})
                        return result
                except Exception as ex:
                        return jsonify({"error": str(ex)})
@name_space.route("/users/delete")
class MainClass(Resource):
        def options(self):
                response = make_response()
                response.headers.add("Access-Control-Allow-Origin", "*")
                response.headers.add('Access-Control-Allow-Headers', "*")
                response.headers.add('Access-Control-Allow-Methods', "*")
                return response
        
        def post(self):
                try:
                        email = request.get_json()['email']
                        df=pd.read_csv('Login.csv')
                        df = df[~df["Email"].str.match(email, na=False)]
                        df.to_csv('Login.csv', index = False)
                        data = df.to_dict('records')
                        result = jsonify({"result":data , "success": email + ' est supprimer avec succés'})
                        return result
                except Exception as ex:
                        return jsonify({"error": str(ex)})
