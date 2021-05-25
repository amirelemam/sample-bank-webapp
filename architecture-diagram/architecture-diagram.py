#!/usr/bin/env python
from diagrams import Diagram
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.database import MongoDB
from diagrams.onprem.compute import Server
from diagrams.custom import Custom

with Diagram("Sample Bank Architecture", show=False):
  maps = Custom("Google Maps API", "./maps.png")

  dns = Server("DNS")

  front = Custom("Frontend", "./react.png")

  am = Custom("Account Manager", "./node.png")
  ps = Custom("Plan Simulator", "./node.png")
  bf = Custom("Branch Finder", "./ts.png")

  db1 = PostgreSQL("PostgreSQL")
  db2 = PostgreSQL("PostgreSQL")
  db3 = MongoDB("MongoDB")

  dns >> front >> am
  front >> ps
  front >> bf

  am >> db1
  ps >> db2
  bf >> db3
  bf >> maps