import threading
import time
import paho.mqtt.client as mqtt
import pymongo
import json

# MQTT settings
from pymongo.errors import OperationFailure

MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883

# MongoDB Atlas settings
MONGO_CONNECTION_STRING = "mongodb+srv://Anshu:SIT314@sit314.efvzdco.mongodb.net/?retryWrites=true&w=majority"
MONGO_DB_NAME = "sit314"
MONGO_COLLECTION_NAME = "lightnodes_data"

# Initialize MQTT client
mqtt_client = mqtt.Client()

# Initialize MongoDB client

mongo_client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = mongo_client[MONGO_DB_NAME]
collection = db[MONGO_COLLECTION_NAME]

all_light_nodes = []

# Subscribe to MQTT topics for all light nodes
MQTT_TOPIC = f"/lightnodes/password/nodePub"


def update_mongo(payload):
    try:
        # Parse the JSON payload into a Python dictionary
        data = json.loads(payload)

        # Assuming the payload includes a unique identifier for the document, such as 'id'
        document_id = data.get('id')

        # Create a dictionary to represent the new light node entry
        new_light_node = {
            "color": data.get('color'),
            "brightness": data.get('brightness'),
            "personDetected": data.get('personDetected'),
            "latestAction": data.get('latestAction', '')  # Provide a default value if 'latestAction' is not in the payload
        }

        # Check if the document with 'id' already exists in the collection
        existing_document = collection.find_one({"_id": 'nodes'})
        if existing_document:
            # Check if node exists inside the existing document
            # nodes = existing_document.get(document_id, {})
            document_id = data.get('id')

            # Update the existing document with the modified 'nodes' object
            collection.update_one(
                {"_id": "nodes"},
                {"$set": {document_id: new_light_node}}
            )
        else:
            # If the document with 'id' doesn't exist, create a new one
            new_document = {
                "_id": 'nodes',
                document_id: new_light_node
            }
            collection.insert_one(new_document)

    except json.JSONDecodeError as e:
        print(f"Error processing message: {e}")


def on_message(client, userdata, msg):
    # This function will be called when a new message is received on the subscribed MQTT topic
    payload = msg.payload.decode('utf-8')
    update_mongo(payload)
    # Handle MQTT command, update MongoDB collection, and publish to the respective MQTT topic

# Set the message callback
mqtt_client.on_message = on_message

# Connect to the MQTT broker
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Subscribe to MQTT topics
mqtt_client.subscribe(MQTT_TOPIC)

# Initialize a thread for listening to MongoDB changes
def mongodb_listener():
    try:
        # Create a change stream on the MongoDB collection
        change_stream = collection.watch(full_document='updateLookup')

        # Create a change stream on the MongoDB collection
        change_stream = collection.watch(full_document='updateLookup')

        for change in change_stream:
            # Check the operation type of the change event
            operation_type = change['operationType']

            # Only process events with 'update' operation type
            if operation_type == 'update':
                # Get the updated document from the change event
                updated_doc = change['fullDocument']

                # Get the previous document state
                changed_node = change['updateDescription']['updatedFields']
                changed_node_id = list(changed_node.keys())[0]
                print('``````````````````````````````````````')
                print('changed_node_id')
                print(changed_node_id.split('.')[0])

                print('``````````````````````````````````````')
                print('changed_node')
                print(changed_node)

                # Check if the length of objects inside the document changed
                print(updated_doc)
                # if len(updated_doc) == len(changed_node):
                print('Triggered on update with no change in length')
                # Publish the updated document to the respective MQTT topic
                mqtt_topic = f"/lightnodes/password/nodeSub/{changed_node_id.split('.')[0]}"
                mqtt_client.publish(mqtt_topic, json.dumps(updated_doc))
    except OperationFailure as e:
        print(f"Error handling MongoDB changes: {e}")




mongodb_thread = threading.Thread(target=mongodb_listener)
mongodb_thread.daemon = True
mongodb_thread.start()

# Start the MQTT client loop (this runs in the background)
mqtt_client.loop_start()

while True:
    pass