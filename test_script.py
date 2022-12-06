from mybusiness.models import *
bt = BusinessType(business_type_name='Insurance',description='Insurancess Business')
bt.save()

pt = ProductType(product_type_name='Life Insurance', description='A type of insurance')
pt.save()

p = Product(product_name='Life 1', product_type = pt, description = 'Life Insurance and dental')
p.save()

bs = BusinessStatus(status_name='Review', description='Under Review')
bs.save()