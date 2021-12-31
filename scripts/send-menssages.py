import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib

contatos_df = pd.read_csv('../files/test.csv')
navegador = webdriver.Chrome('drivers/linux-96/chromedriver')
navegador.get('https://web.whatsapp.com/')

while len(navegador.find_elements_by_id('side')) < 1:
    time.sleep(1)

mensagem = 'Esta mensagem é um teste para envio de mensagens automaticas, desconsidere!'

for i in contatos_df.index:
    # pessoa = contatos_df.loc[i, 'Pessoa']
    numero = contatos_df.loc[i, 'telefone']
    texto = urllib.parse.quote(mensagem)
    link = f'https://web.whatsapp.com/send?phone={numero}&text={texto}'
    navegador.get(link)
    while len(navegador.find_elements_by_id('side')) < 1:
        time.sleep(1)
    navegador.find_element_by_xpath("//*[@id='main']/footer/div[1]/div[2]/div/div[2]").send_keys(Keys.ENTER)
    time.sleep(10)
