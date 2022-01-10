import pandas as pd
from selenium import webdriver
import time
import urllib
import sys

def send_menssages(file_path, menssage, chrome_version):
    print(file_path, menssage, chrome_version)

    def verify_number(number):
        number = str(number).replace('(', '').replace(')', '').replace('-', '').replace(' ', '')
        if len(str(number)) == 11:
            number = '55' + number 
        elif len(str(number)) == 9:
            number = '5514' + number
        return number
        
    contatos_df = pd.read_csv(file_path)
    # driver = webdriver.Chrome('drivers/linux-{}/chromedriver'.format(chrome_version))
    driver = webdriver.Chrome('/home/biston/Projetos/auto-whatsapp-senai/drivers/linux-96/chromedriver')
    driver.get('https://web.whatsapp.com/')

    while len(driver.find_elements_by_id('side')) < 1:
        time.sleep(1)

    for i in contatos_df.index:
        print(contatos_df.loc[i, 'nome'], i)
        name = contatos_df.loc[i, 'nome']
        new_menssage = menssage.replace('*nome*', name)
        number = verify_number(contatos_df.loc[i, 'telefone'])
        text = urllib.parse.quote(new_menssage)
        link = f'https://web.whatsapp.com/send?phone={number}&text={text}'
        driver.get(link)
        while len(driver.find_elements_by_id('side')) < 1:
            time.sleep(1)

        while len(driver.find_elements_by_css_selector('footer div div span div div div button')) < 1:
            time.sleep(1)

        driver.find_element_by_xpath('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[2]/button').click()
        time.sleep(10)

send_menssages(sys.argv[1], sys.argv[2], sys.argv[3])

# send_menssages('/home/biston/Projetos/auto-whatsapp-senai/files/test.csv', 'Ola *nome*, esta é uma mensagem automatica!', '96')