from flask import Flask, make_response, request, jsonify
from bson.json_util import dumps
import pymongo
import json
from pymongo.server_api import ServerApi
from flask_cors import cross_origin
import sys

app = Flask(__name__)

client = pymongo.MongoClient(
    f"mongodb+srv://@cluster0.7eij7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    server_api=ServerApi('1'))
db = client['maki']
cred = db["credentials"]
listings = db["listings"]
counter = db["counter"]


def get_next_available_id(name):
    """ Get next current id available. """
    result = counter.find_one_and_update(
        {"_id": name},
        {"$inc": {"current": 1}},
        {"returnOriginal": False})
    return result["current"]


@app.route('/login', methods=['OPTIONS', 'POST'])
@cross_origin()
def login():
    if request.method == "OPTIONS":
        # Add CORS headers for front-end to request.
        response = make_response()
        response.headers["Access-Control-Allow-Headers"] = ["Accept, Content-Type"]
        response.headers["Access-Control-Allow-Credentials"] = True
        response.headers["Access-Control-Allow-Methods"] = ["GET", "POST"]
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    if request.method == "POST":
        try:
            content = request.json
            email = content["email"]
            password = content["password"]
            for x in [email, password]:
                if len(x) == 0:
                    raise Exception("Empty parameters")
        except Exception as e:
            print(e)
            return jsonify(login=False, reason="Invalid data submitted.")
        query = {
            "email": email,
            "password": password
        }
        credentials = cred.find_one(query, {"_id": 0})
        if credentials:
            return jsonify({"login": True, "role": credentials["role"], "username": credentials["name"], "id": credentials["id"], "consent": credentials["consent"]})

        return jsonify({"login": False, "reason": "Account not found, or user password is wrong."})


@app.route('/change_name', methods=['OPTIONS', 'GET'])
@cross_origin()
def change_name():
    if request.method == "OPTIONS":
        # Add CORS headers for front-end to request.
        response = make_response()
        response.headers["access-control-allow-headers"] = ["Accept, Content-Type"]
        response.headers["access-control-allow-credentials"] = True
        response.headers["access-control-allow-methods"] = ["GET", "POST"]
        response.headers["access-control-allow-origin"] = "*"
        return response

    args = request.args
    query = {}

    if args.get("name") and args.get("id"):
        query.update({"id": int(args.get("id"))})

    response = json.dumps({"success": False})
    if len(list(cred.find(query, {"_id": 0}))) == 1:
        cred.update_one(query, {"$set": {"name": args.get("name")}})
        response = json.dumps({"success": True})
    return response



@app.route('/signup', methods=['OPTIONS', 'POST'])
@cross_origin()
def create_consultant():
    if request.method == "OPTIONS":
        # Add CORS headers for front-end to request.
        response = make_response()
        response.headers["access-control-allow-headers"] = ["Accept, Content-Type"]
        response.headers["access-control-allow-credentials"] = True
        response.headers["access-control-allow-methods"] = ["GET", "POST"]
        response.headers["access-control-allow-origin"] = "*"
        return response

    if request.method == "POST":
        try:
            content = request.json
            email = content["email"]
            password = content["password"]
            name = content["username"]
            consent = content["email_consent"]
            consent = True if consent == 1 else False
            # print(email, password, name, consent)
            for x in [email, password, name]:
                if len(x) == 0:
                    raise Exception("Value is wrong")
        except Exception as e:
            print(e)
            return jsonify(success=False, reason="Invalid data submitted.")
        query = {
            "email": email,
            "password": password,
            "name": name,
            "consent": consent,
            "role": "consultant"
        }
        # Check to see if email is in the cred table.
        if not list(cred.find({"email": email})):
            # We can add it to the database.
            next_id = get_next_available_id("credentials")
            query.update({"id": next_id})
            cred.insert_one(query)
            return jsonify(success=True)
        else:
            # Give error to user.
            return jsonify(success=False, reason="Email is already in use.")


@app.route('/getcon', methods=['OPTIONS', 'GET'])
@cross_origin()
def get_consultants():
    if request.method == "OPTIONS":
        # Add CORS headers for front-end to request.
        response = make_response()
        response.headers["access-control-allow-headers"] = ["Accept, Content-Type"]
        response.headers["access-control-allow-credentials"] = True
        response.headers["access-control-allow-methods"] = ["GET", "POST"]
        response.headers["access-control-allow-origin"] = "*"
        return response

    args = request.args
    query = {}

    if args.get("name"):
        query.update({"name": {"$regex": args.get("name"), "$options": "i"}})
    query.update({"role": "consultant"})
    
    return jsonify(consultants=list(cred.find(query, {"_id": 0,"password": 0})))
    


@app.route('/delcon', methods=['OPTIONS', 'GET'])
@cross_origin()
def delete_consultant():
    if request.method == "OPTIONS":
        # Add CORS headers for front-end to request.
        response = make_response()
        response.headers["access-control-allow-headers"] = ["Accept, Content-Type"]
        response.headers["access-control-allow-credentials"] = True
        response.headers["access-control-allow-methods"] = ["GET"]
        response.headers["access-control-allow-origin"] = "*"
        return response

    args = request.args
    query = {}

    # account to delete
    if args.get("id"):
        query.update({"id": int(args.get("id"))})
    # consultant exclusivity
    #query.update({"role": "consultant"})

    print(query)

    response = json.dumps({"success": False})
    if len(list(cred.find(query, {"_id": 0}))) == 1:
        cred.delete_one(query)
        response = json.dumps({"success": True})
    return response




# Cant get change consent to actually change the value of consent, it doesnt update but backend works, just change mongodb query.
@app.route('/change_consent', methods=['OPTIONS', 'GET'])
@cross_origin()
def change_consent():
    if request.method == "OPTIONS":
        # Add CORS headers for front-end to request.
        response = make_response()
        response.headers["access-control-allow-headers"] = ["Accept, Content-Type"]
        response.headers["access-control-allow-credentials"] = True
        response.headers["access-control-allow-methods"] = ["GET", "POST"]
        response.headers["access-control-allow-origin"] = "*"
        return response

    args = request.args
    

    query = {}

    if args.get("id") and args.get("consent"):
        consent = (args.get("consent"))
        consent = True if consent == 'true' else False
        query.update({"id": int(args.get("id"))})

    response = jsonify({"success": False})

    if len(list(cred.find(query, {"_id": 0}))) == 1:
        cred.update_one(query, {"$set": {"consent": consent}})
        response = jsonify({"success": True})
    return response

    
    





@app.route('/listing', methods=['OPTIONS', 'GET'])
@cross_origin()
def get_listing():
    if request.method == "OPTIONS":
        # Add CORS headers for front-end to request.
        response = make_response()
        response.headers["access-control-allow-headers"] = ["Accept, Content-Type"]
        response.headers["access-control-allow-credentials"] = True
        response.headers["access-control-allow-methods"] = ["GET"]
        response.headers["access-control-allow-origin"] = "*"
        return response

    if request.method == "GET":
        args = request.args
        query = {}

        # specific listing
        if args.get("id"):
            id = args.get("id")
            # get from database that id
            return jsonify(listings.find_one({"id": int(id)}, {"_id": 0}))


        # general listings
        else:
            # these are the more complicated ones
            if args.get("target"):
                target = args.get("target")
            if args.get("distance"):
                distance = args.get("distance")
            if args.get("links"):
                links = args.get("links")

            # middle
            if args.get("query"):
                query.update({"$or": [{"listing_subtitle": {"$regex": args.get("query"), "$options": "i"}},
                                      {"listing_title": {"$regex": args.get("query"), "$options": "i"}}]})

            # simpler args
            if args.get("Mprice"):
                query.update({"monthly_price": {"$lte": int(args.get("Mprice"))}})
            if args.get("Wprice"):
                query.update({"weekly_price": {"$lte": int(args.get("Wprice"))}})
            if args.get("Ptype"):
                query.update({"property_type": args.get("Ptype")})
            if args.get("Clength"):
                query.update({"contract_length": {"$lte": int(args.get("Clength"))}})
            if args.get("tag"):
                query.update({"listing_tags": {"$in": [args.get("tag")]}})

            print(query)

            if not query:
                response = make_response(json.dumps(None))
                print("Null query")
            else:
                # use these to query database
                result = (list(listings.find(query, {"_id": 0})))
                response = make_response(dumps({"listings_no": len(result), "listings": result}))

            response.mimetype = 'application/json'
            return response


if __name__ == '__main__':
    app.run(port=3500)
