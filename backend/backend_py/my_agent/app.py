'''
from langchain_community.utilities import SQLDatabase
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.sql.base import create_sql_agent
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langchain.agents.agent_types import AgentType
from sqlalchemy import create_engine
from langchain_core.callbacks.base import BaseCallbackHandler


class SQLHandler(BaseCallbackHandler):
    def __init__(self):
        self.sql_result = []

    def on_agent_action(self, action, **kwargs):
        """Run on agent action. if the tool being used is sql_db_query,
         it means we're submitting the sql and we can 
         record it as the final sql"""

        if action.tool in ["sql_db_query_checker","sql_db_query"]:
            self.sql_result.append(action.tool_input)
# Insert your OpenAI API key here
openai_api_key= "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";

# Instantiate the database
db = SQLDatabase.from_uri("sqlite:///Chinook.db")
print(db.dialect)
print(db.get_usable_table_names())
db.run("SELECT * FROM Artist LIMIT 10;")



# Instantiate the LLM
llm = OpenAI(temperature=0, verbose=True, openai_api_key=openai_api_key)

db_agent = create_sql_agent(
    llm=llm,
    toolkit=SQLDatabaseToolkit(db=db, llm=llm),
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    top_k=1000

    )
    
handler = SQLHandler()
response = db_agent.invoke({"input": "Can you give me all genres with their sell totals?"},{'callbacks':[handler]})
sql_queries = handler.sql_result
print(response)
print(sql_queries)
 
'''
# Insert your OpenAI API key here
#openai_api_key= "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";

# Instantiate the database
#db = SQLDatabase.from_uri("sqlite:///Chinook.db")
#print(db.dialect)
#print(db.get_usable_table_names())
#db.run("SELECT * FROM Artist LIMIT 10;")



# Instantiate the LLM
#llm = OpenAI(temperature=0, verbose=True, openai_api_key=openai_api_key)

# Create the 

'''
agent_executor = create_sql_agent(
    llm=llm,
    toolkit=SQLDatabaseToolkit(db=db, llm=llm),
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
)

# Test the agent
response = agent_executor.invoke({"input": "Who is the best seller?"})
print(response)

'''
from flask import Flask, request, jsonify
from langchain_community.utilities import SQLDatabase
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.sql.base import create_sql_agent
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langchain.agents.agent_types import AgentType
from sqlalchemy import create_engine
from langchain_core.callbacks.base import BaseCallbackHandler
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class SQLHandler(BaseCallbackHandler):
    def __init__(self):
        self.sql_result = []

    def on_agent_action(self, action, **kwargs):
        if action.tool in ["sql_db_query_checker", "sql_db_query"]:
            self.sql_result.append(action.tool_input)


# Replace with your OpenAI API Key
openai_api_key= "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";
db = SQLDatabase.from_uri("sqlite:///Chinook.db")
llm = OpenAI(temperature=0, verbose=True, openai_api_key=openai_api_key)

db_agent = create_sql_agent(
    llm=llm,
    toolkit=SQLDatabaseToolkit(db=db, llm=llm),
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    top_k=100000,
)

# Instantiate the database

print(db.dialect)
print(db.get_usable_table_names())
handler = SQLHandler()
response = db_agent.invoke({"input": "what is the total number of customers for our employees, seperately?"},{'callbacks':[handler]}) 
sql_queries = handler.sql_result
print(response.get('output'))
print(type(response.get('output')))
print(sql_queries[0])



@app.route("/query", methods=["POST"])
def query_database():
    try:
        data = request.json
        user_query = data.get("query")
        print(db.dialect)
        print(db.get_usable_table_names())
        db.run("SELECT * FROM Artist LIMIT 10;")
        handler = SQLHandler()
        response = db_agent.invoke({"input": user_query}, {'callbacks': [handler]})
        
        sql_queries = handler.sql_result
        return jsonify({"response": response, "queries": sql_queries})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

