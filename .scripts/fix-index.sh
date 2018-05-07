#!/bin/bash

sed -i 's|<title></title>|<title><%= title %></title>|g' dist/client/index.html

echo Fixed index.html meta data.
