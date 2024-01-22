from pyvirtualdisplay import Display
display = Display(visible=0, size=(800, 600))
display.start()

# pip install pywhatkit
import pywhatkit as kit

# Specify the phone number (with country code) and the message
phone_number = "+3400000000" # put the required phone number here
message = "Hello from Python! This is an instant WhatsApp message."

# Send the message instantly
kit.sendwhatmsg_instantly(phone_number, message)