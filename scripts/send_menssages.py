import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib

def send_menssages(file_path, mensagem, chrome_version):

    def verify_number(number):
        number = number.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')
        if len(str(number)) == 11:
            number = '55' + number 
        elif len(str(number)) == 9:
            number = '5514' + number
        return number
        
    contatos_df = pd.read_csv(file_path)
    navegador = webdriver.Chrome('drivers/linux-{}/chromedriver'.format(chrome_version))
    navegador.get('https://web.whatsapp.com/')

    while len(navegador.find_elements_by_id('side')) < 1:
        time.sleep(1)

    for i in contatos_df.index:
        nome = contatos_df.loc[i, 'nome']
        mensagem = mensagem.replace('*nome*', nome)
        numero = verify_number(contatos_df.loc[i, 'telefone'])
        texto = urllib.parse.quote(mensagem)
        link = f'https://web.whatsapp.com/send?phone={numero}&text={texto}'
        navegador.get(link)
        while len(navegador.find_elements_by_id('side')) < 1:
            time.sleep(1)
        navegador.find_element_by_xpath("//*[@id='main']/footer/div[1]/div[2]/div/div[2]").send_keys(Keys.ENTER)
        time.sleep(10)

    
