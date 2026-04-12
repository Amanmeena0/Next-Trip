import os
from dotenv import load_dotenv, find_dotenv


class Model:

    def __int__(self):
        self.model_name = "gemini-2.5-flash"
    def get_model(self):
        return self.model_name


get_Model = Model()