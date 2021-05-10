# Installation
# $ brew install graphviz
# $ pip install diagrams

# Run
# $ python architecure-diagram.py

from diagrams import Diagram
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.database import MongoDB
from diagrams.custom import Custom
from diagrams.onprem.compute import Server

with Diagram("Sample Bank Architecture", show=False):
  maps = Custom("Google Maps API", "./maps.png")

  dns = Server("DNS")

  front = Custom("Frontend", "./react.png")

  am = Custom("Account Manager", "./node.png")
  ats = Custom("Account Type Simulator", "./node.png")
  bf = Custom("Branch Finder", "./ts.png")

  db1 = PostgreSQL("PostgreSQL")
  db2 = PostgreSQL("PostgreSQL")
  db3 = MongoDB("MongoDB")

  dns >> front >> am
  front >> ats
  front >> bf

  am >> db1
  ats >> db2
  bf >> db3
  bf >> maps