import time
import random
import paho.mqtt.client as mqtt
import json
import jsonschema  # Import the jsonschema library

# MQTT settings
MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883
TOPIC_PASS = 'password'


class LightNode():
    def __init__(self):
        # Initialize an empty dictionary for the light node
        self.data = {}
        self.generate_random_data()
        self.number_of_people = 0

    def generate_random_data(self):
        # Generate random data for the light node
        current_timestamp = int(time.time() * 1000)
        random_suffix = random.randint(1, 1000)
        self.unique_id = f"{current_timestamp}-{random_suffix}"
        self.data['id'] = self.unique_id
        self.data['color'] = '#' + ''.join(random.choice('0123456789ABCDEF') for _ in range(6))
        self.data['brightness'] = random.randint(0, 100)
        self.data['personDetected'] = random.choice([True, False])

    def detect_action(self):
        action =  input('\n>> ')
        if 'in' == action.lower():
            self.number_of_people += 1
            self.data['personDetected'] = True
        elif 'out' == action.lower():
            if self.number_of_people > 0:
                self.number_of_people -= 1
            if self.number_of_people == 0:
                self.data['personDetected'] = False
        return action


ln = LightNode()  # Create the LightNode instance before defining MQTT_TOPIC

# MQTT topic is based on the unique ID of the LightNode
MQTT_SUBSCRIPTION_TOPIC = f"/lightnodes/{TOPIC_PASS}/nodeSub/{ln.unique_id}"
MQTT_PUBLISH_TOPIC = f"/lightnodes/{TOPIC_PASS}/nodePub"


# Initialize MQTT client
mqtt_client = mqtt.Client()

def on_message(client, userdata, msg):
    # This function will be called when a new message is received on the subscribed topic
    payload_str = msg.payload.decode('utf-8')
    payload_dict = json.loads(payload_str)

    # Access the 'nodes' key in the dictionary
    if ln.unique_id in payload_dict:
        payload_dict[ln.unique_id]['id'] = ln.unique_id
        ln.data = payload_dict[ln.unique_id]
    else:
        print("'nodes' key not found in the payload dictionary.")
    print(f"Received message: {ln.data}")

# Set the message callback
mqtt_client.on_message = on_message

# Connect to the MQTT broker
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Subscribe to the MQTT topic
mqtt_client.subscribe(MQTT_SUBSCRIPTION_TOPIC)

mqtt_client.loop_start()


# JSON Schema for light node data
LIGHT_NODE_SCHEMA = {
    "type": "object",
    "properties": {
        "id": {"type": "string"},
        "color": {"type": "string"},
        "brightness": {"type": "integer", "minimum": 0, "maximum": 100},
        "personDetected": {"type": "boolean"}
    },
    "required": ["id", "color", "brightness", "personDetected"]
}

while True:
    action = ln.detect_action()
    print("No People: " + str(action))

    # Create a new dictionary with updated data
    new_data = ln.data
    new_data['latestAction'] = action

    # Validate the data against the JSON schema
    jsonschema.validate(new_data, LIGHT_NODE_SCHEMA)

    # Convert the data to JSON
    data_to_publish = json.dumps(new_data)

    # Publish user action to the MQTT topic for publishing updates
    mqtt_client.publish(MQTT_PUBLISH_TOPIC, data_to_publish)
