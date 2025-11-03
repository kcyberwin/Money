import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { MysqlService } from './mysql/mysql.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

//DTOs
import { UserRoleDto } from './dto/useRole.dto';
import { DbModifyResult } from './dto/dbRowModify.dto';
import { AccountTypeDto } from './dto/accountType.dto';
import { UserDto } from './dto/user.dto';
import { TransactionTypeDto } from './dto/transactionType.dto';
import { TenantDto } from './dto/tenant.dto';
import { BankDto } from './dto/bank.dto';
import { AccountDto } from './dto/account.dto';
import { CategoryTypeDto } from './dto/categoryType.dto';
import { CategoryDto } from './dto/category.dto';
import { SubCategoryDto } from './dto/subcategory.dto';
import { PayeeDto } from './dto/payee.dto';
import { CreateTransactionDto } from './dto/createTransaction.dto';

//SQL Text consts
import * as SELECTTXT from './sqltxt/select.sql.json';
import * as INSERTTXT from './sqltxt/insert.sql.json';
import * as UPDATETXT from './sqltxt/update.sql.json';
import * as DELTXT from './sqltxt/delete.sql.json';


const ADMINDBTAG: string = 'DB Routes'

@ApiTags('All DB Routes')
@Controller('api')
export class DBController {
    constructor (
        private mysqlService: MysqlService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    /************************************************************/
    /* user-roles                                               */
    /************************************************************/
    @Get('user-roles')
    @ApiOperation({ summary: 'Get all User Roles' })
    @ApiTags(`${ADMINDBTAG}:user-role`)
    async getUserRoles(): Promise<UserRoleDto[]> {
        return <UserRoleDto[]> await this.mysqlService.findAll(SELECTTXT['USER-ROLES'], []);
    }
    
    @Get('user-role/:id')
    @ApiOperation( { summary: 'Get User Role by ID'})
    @ApiTags(`${ADMINDBTAG}:user-role`)
    @ApiParam({ name: 'id', description: 'ID of User Role to find' })
    async getUserRole(@Param('id') id: number): Promise<UserRoleDto> {
        const result: UserRoleDto[] = <UserRoleDto[]> await this.mysqlService.findOneById(SELECTTXT['USER-ROLE'], id);
        return result[0];
    }
    

    @Post('user-role')
    @ApiOperation({ summary: 'Post new User Role' })
    @ApiTags(`${ADMINDBTAG}:user-role`)
    @ApiBody({ type: UserRoleDto })
    async postUserRole(@Body() createUserRoleDto: UserRoleDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT['USER-ROLE'], [createUserRoleDto.roleName, createUserRoleDto.description, createUserRoleDto.createdById, createUserRoleDto.lastModifiedById]);
    }

    @Put('user-role')
    @ApiOperation({ summary: 'Update existing User Role' })
    @ApiTags(`${ADMINDBTAG}:user-role`)
    @ApiBody({type: UserRoleDto})
    async updateUserRole(@Body() updateUserRoleDto: UserRoleDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.USER_ROLE, [updateUserRoleDto.roleName, updateUserRoleDto.description, updateUserRoleDto.lastModifiedById, updateUserRoleDto.id]);
    }

    @Delete('user-role/:id')
    @ApiOperation({ summary: 'Delete existing User Role by ID' })
    @ApiTags(`${ADMINDBTAG}:user-role`)
    @ApiParam({ name: 'id', description: 'ID of User Role to delete' })
    async deleteUserRole(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT['USER-ROLE'], [ id ])
    }

    
    /************************************************************/
    /* user                                                     */
    /************************************************************/

    @Get('users')
    @ApiOperation({ summary: 'Get all Users'})
    @ApiTags(`${ADMINDBTAG}:user`)
    async getUsers(): Promise<UserDto[]> {
        return <UserDto[]> await this.mysqlService.findAll(SELECTTXT.USERS, []);
    }

    @Get('user/:id')
    @ApiOperation({ summary: 'Get User by ID'})
    @ApiTags(`${ADMINDBTAG}:user`)
    @ApiParam({ name: 'id', description: 'ID of User to find' })
    async getUser(@Param('id') id: number): Promise<UserDto> {
        const result: UserDto[] = <UserDto[]> await this.mysqlService.findOneById(SELECTTXT.USER, id);
        return result[0];
    }

    @Post('user')
    @ApiOperation({ summary: 'Post new User' })
    @ApiTags(`${ADMINDBTAG}:user`)
    @ApiBody({ type: UserDto })
    async postUser(@Body() createUserDto: UserDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT.USER, [createUserDto.userName, createUserDto.password, createUserDto.userRoleId, createUserDto.createdById, createUserDto.lastModifiedById]);
    }

    @Put('user')
    @ApiOperation({ summary: 'Update existing user'})
    @ApiTags(`${ADMINDBTAG}:user`)
    @ApiBody({ type: UserDto })
    async updateUser(@Body() updateUserDto: UserDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.USER, [updateUserDto.password, updateUserDto.userRoleId,  updateUserDto.lastModifiedById, updateUserDto.id]);
    }

    @Delete('user/:id')
    @ApiOperation({ summary: 'Delete existing user' })
    @ApiTags(`${ADMINDBTAG}:user`)
    async deleteUser(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT.USER, [id])
    }

    /************************************************************/
    /* account-type                                             */
    /************************************************************/
    @Get('account-type')
    @ApiOperation({ summary: 'Get all account types' })
    @ApiTags(`${ADMINDBTAG}:account-type`)
    async getAccountTypes(): Promise<AccountTypeDto[]> {
        return <AccountTypeDto[]> await this.mysqlService.findAll(SELECTTXT['ACCOUNT-TYPES'], []);
    }
    
    @Get('account-type/:id')
    @ApiOperation( { summary: 'Get Account Type by ID'})
    @ApiTags(`${ADMINDBTAG}:account-type`)
    @ApiParam({ name: 'id', description: 'ID of Account Type to find' })
    async getAccountType(@Param('id') id: number): Promise<AccountTypeDto> {
        const result: AccountTypeDto[] = <AccountTypeDto[]> await this.mysqlService.findOneById(SELECTTXT['ACCOUNT-TYPE'], id);
        return result[0];
    }
    

    @Post('account-type')
    @ApiOperation({ summary: 'Post new Account Type' })
    @ApiTags(`${ADMINDBTAG}:account-type`)
    @ApiBody({ type: AccountTypeDto })
    async postAccountType(@Body() createAccountTypeDto: AccountTypeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT['ACCOUNT-TYPE'], [createAccountTypeDto.accountTypeName, createAccountTypeDto.description, createAccountTypeDto.createdById, createAccountTypeDto.lastModifiedById]);
    }

    @Put('account-type')
    @ApiOperation({ summary: 'Update existing Account Type' })
    @ApiTags(`${ADMINDBTAG}:account-type`)
    @ApiBody({type: AccountTypeDto})
    async updateAccountType(@Body() updateAccountTypeDto: AccountTypeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT['ACCOUNT-TYPE'], [updateAccountTypeDto.accountTypeName, updateAccountTypeDto.description, updateAccountTypeDto.lastModifiedById, updateAccountTypeDto.id]);
    }

    @Delete('account-type/:id')
    @ApiOperation({ summary: 'Delete existing Account Type by ID' })
    @ApiTags(`${ADMINDBTAG}:account-type`)
    @ApiParam({ name: 'id', description: 'ID of Account Type to delete' })
    async deleteAccountType(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT['ACCOUNT-TYPE'], [ id ])
    }

    /************************************************************/
    /* transaction-type                                             */
    /************************************************************/
    @Get('transaction-type')
    @ApiOperation({ summary: 'Get all Transaction Types' })
    @ApiTags(`${ADMINDBTAG}:transaction-type`)
    async getTransactionTypes(): Promise<TransactionTypeDto[]> {
        return <TransactionTypeDto[]> await this.mysqlService.findAll(SELECTTXT['TRANSACTION-TYPES'], []);
    }
    
    @Get('transaction-type/:id')
    @ApiOperation( { summary: 'Get Transaction Type by ID'})
    @ApiTags(`${ADMINDBTAG}:transaction-type`)
    @ApiParam({ name: 'id', description: 'ID of Transaction Type to find' })
    async getTransactionType(@Param('id') id: number): Promise<TransactionTypeDto> {
        const result: TransactionTypeDto[] = <TransactionTypeDto[]> await this.mysqlService.findOneById(SELECTTXT['TRANSACTION-TYPE'], id);
        return result[0];
    }
    

    @Post('transaction-type')
    @ApiOperation({ summary: 'Post new Transaction Type' })
    @ApiTags(`${ADMINDBTAG}:transaction-type`)
    @ApiBody({ type: TransactionTypeDto })
    async postTransactionType(@Body() createTransactionType: TransactionTypeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT['TRANSACTION-TYPE'], [createTransactionType.displayName, createTransactionType.createdById, createTransactionType.lastModifiedById]);
    }

    @Put('transaction-type')
    @ApiOperation({ summary: 'Update existing Transaction Type' })
    @ApiTags(`${ADMINDBTAG}:transaction-type`)
    @ApiBody({type: TransactionTypeDto})
    async updateTransactionType(@Body() updateTransactionDto: TransactionTypeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT['TRANSACTION-TYPE'], [updateTransactionDto.displayName, updateTransactionDto.lastModifiedById, updateTransactionDto.id]);
    }

    @Delete('transaction-type/:id')
    @ApiOperation({ summary: 'Delete existing Transaction Type by ID' })
    @ApiTags(`${ADMINDBTAG}:transaction-type`)
    @ApiParam({ name: 'id', description: 'ID of Transaction Type to delete' })
    async deleteTransactionType(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT['TRANSACTION-TYPE'], [ id ])
    }

    /************************************************************/
    /* tenant                                                   */
    /************************************************************/
    @Get('tenant')
    @ApiOperation({ summary: 'Get all Tenants' })
    @ApiTags(`${ADMINDBTAG}:tenant`)
    async getTenants(): Promise<TenantDto[]> {
        return <TenantDto[]> await this.mysqlService.findAll(SELECTTXT.TENANTS, []);
    }
    
    @Get('tenant/:id')
    @ApiOperation( { summary: 'Get Tenant by ID'})
    @ApiTags(`${ADMINDBTAG}:tenant`)
    @ApiParam({ name: 'id', description: 'ID of Tenant to find' })
    async getTenant(@Param('id') id: number): Promise<TenantDto> {
        const result: TenantDto[] = <TenantDto[]> await this.mysqlService.findOneById(SELECTTXT.TENANT, id);
        return result[0];
    }
    

    @Post('tenant')
    @ApiOperation({ summary: 'Post new Tenant' })
    @ApiTags(`${ADMINDBTAG}:tenant`)
    @ApiBody({ type: TenantDto })
    async postTenant(@Body() createTenantDto: TenantDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT.TENANT, [createTenantDto.tenantName, createTenantDto.createdById, createTenantDto.lastModifiedById]);
    }

    @Put('tenant')
    @ApiOperation({ summary: 'Update existing Tenant' })
    @ApiTags(`${ADMINDBTAG}:tenant`)
    @ApiBody({type: TenantDto})
    async updateTenant(@Body() updateTenantDto: TenantDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.TENANT, [updateTenantDto.tenantName, updateTenantDto.lastModifiedById, updateTenantDto.id]);
    }

    @Delete('tenant/:id')
    @ApiOperation({ summary: 'Delete existing Tenant by ID' })
    @ApiTags(`${ADMINDBTAG}:tenant`)
    @ApiParam({ name: 'id', description: 'ID of Tenant to delete' })
    async deleteTenant(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT.TENANT, [ id ])
    }

    /************************************************************/
    /* bank                                                   */
    /************************************************************/
    @Get('bank')
    @ApiOperation({ summary: 'Get all banks' })
    @ApiTags(`${ADMINDBTAG}:bank`)
    async getBanks(): Promise<BankDto[]> {
        return <BankDto[]> await this.mysqlService.findAll(SELECTTXT.BANKS, []);
    }
    
    @Get('bank/:id')
    @ApiOperation( { summary: 'Get Bank by ID'})
    @ApiTags(`${ADMINDBTAG}:bank`)
    @ApiParam({ name: 'id', description: 'ID of Bank to find' })
    async getBank(@Param('id') id: number): Promise<BankDto> {
        const result: BankDto[] = <BankDto[]> await this.mysqlService.findOneById(SELECTTXT.BANK, id);
        return result[0];
    }
    

    @Post('bank')
    @ApiOperation({ summary: 'Post new Bank' })
    @ApiTags(`${ADMINDBTAG}:bank`)
    @ApiBody({ type: BankDto })
    async postBank(@Body() createBankDto: BankDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT.BANK, [createBankDto.name, createBankDto.externalId, createBankDto.createdById, createBankDto.lastModifiedById]);
    }

    @Put('bank')
    @ApiOperation({ summary: 'Update existing Bank' })
    @ApiTags(`${ADMINDBTAG}:bank`)
    @ApiBody({type: BankDto})
    async updateBank(@Body() updateBankDto: BankDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.BANK, [updateBankDto.name, updateBankDto.externalId, updateBankDto.lastModifiedById, updateBankDto.id]);
    }

    @Delete('bank/:id')
    @ApiOperation({ summary: 'Delete existing Bank by ID' })
    @ApiTags(`${ADMINDBTAG}:bank`)
    @ApiParam({ name: 'id', description: 'ID of Bank to delete' })
    async deleteBank(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT.BANK, [ id ])
    }

    /************************************************************/
    /* account                                                  */
    /************************************************************/
    @Get('account')
    @ApiOperation({ summary: 'Get all Accounts' })
    @ApiTags(`${ADMINDBTAG}:account`)
    async getAccounts(): Promise<AccountDto[]> {
        return <AccountDto[]> await this.mysqlService.findAll(SELECTTXT.ACCOUNTS, []);
    }
    
    @Get('account/:id')
    @ApiOperation( { summary: 'Get Account by ID'})
    @ApiTags(`${ADMINDBTAG}:account`)
    @ApiParam({ name: 'id', description: 'ID of Account to find' })
    async getAccount(@Param('id') id: number): Promise<AccountDto> {
        const result: AccountDto[] = <AccountDto[]> await this.mysqlService.findOneById(SELECTTXT.ACCOUNT, id);
        return result[0];
    }
    

    @Post('account')
    @ApiOperation({ summary: 'Post new Account' })
    @ApiTags(`${ADMINDBTAG}:account`)
    @ApiBody({ type: AccountDto })
    async postAccount(@Body() createAccountDto: AccountDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT.ACCOUNT, [createAccountDto.displayName, createAccountDto.accountTypeId, createAccountDto.tenantId, createAccountDto.bankId, createAccountDto.createdById, createAccountDto.lastModifiedById]);
    }

    @Put('account')
    @ApiOperation({ summary: 'Update existing Account' })
    @ApiTags(`${ADMINDBTAG}:account`)
    @ApiBody({type: AccountDto})
    async updateAccount(@Body() updateAccountDto: AccountDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.ACCOUNT, [updateAccountDto.displayName, updateAccountDto.lastModifiedById, updateAccountDto.id]);
    }

    @Delete('account/:id')
    @ApiOperation({ summary: 'Delete existing Account by ID' })
    @ApiTags(`${ADMINDBTAG}:account`)
    @ApiParam({ name: 'id', description: 'ID of Account to delete' })
    async deleteAccount(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT.ACCOUNT, [ id ])
    }

    /************************************************************/
    /* category-type                                            */
    /************************************************************/
    @Get('category-type')
    @ApiOperation({ summary: 'Get all Category Types' })
    @ApiTags(`${ADMINDBTAG}:category-type`)
    async getCatTypes(): Promise<CategoryTypeDto[]> {
        return <CategoryTypeDto[]> await this.mysqlService.findAll(SELECTTXT['CATEGORY-TYPES'], []);
    }
    
    @Get('category-type/:id')
    @ApiOperation( { summary: 'Get Category Type by ID'})
    @ApiTags(`${ADMINDBTAG}:category-type`)
    @ApiParam({ name: 'id', description: 'ID of Category Type to find' })
    async getCatType(@Param('id') id: number): Promise<CategoryTypeDto> {
        const result: CategoryTypeDto[] = <CategoryTypeDto[]> await this.mysqlService.findOneById(SELECTTXT['CATEGORY-TYPE'], id);
        return result[0];
    }
    

    @Post('category-type')
    @ApiOperation({ summary: 'Post new Category Type' })
    @ApiTags(`${ADMINDBTAG}:category-type`)
    @ApiBody({ type: CategoryTypeDto })
    async postCatType(@Body() createCatType: CategoryTypeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT['CATEGORY-TYPE'], [createCatType.categoryTypeName,  createCatType.createdById, createCatType.lastModifiedById]);
    }

    @Put('category-type')
    @ApiOperation({ summary: 'Update existing Category Type' })
    @ApiTags(`${ADMINDBTAG}:category-type`)
    @ApiBody({type: CategoryTypeDto})
    async updateCatType(@Body() updateCatType: CategoryTypeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT['CATEGORY-TYPE'], [updateCatType.categoryTypeName, updateCatType.lastModifiedById, updateCatType.id]);
    }

    @Delete('category-type/:id')
    @ApiOperation({ summary: 'Delete existing Category Type by ID' })
    @ApiTags(`${ADMINDBTAG}:category-type`)
    @ApiParam({ name: 'id', description: 'ID of Category Type to delete' })
    async deleteCatType(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT['CATEGORY-TYPE'], [ id ])
    }

    /************************************************************/
    /* category                                            */
    /************************************************************/
    @Get('category')
    @ApiOperation({ summary: 'Get all Categories' })
    @ApiTags(`${ADMINDBTAG}:category`)
    async getCats(): Promise<CategoryDto[]> {
        return <CategoryDto[]> await this.mysqlService.findAll(SELECTTXT.CATEGORIES, []);
    }
    
    @Get('category/:id')
    @ApiOperation( { summary: 'Get Category by ID'})
    @ApiTags(`${ADMINDBTAG}:category`)
    @ApiParam({ name: 'id', description: 'ID of Category to find' })
    async getCat(@Param('id') id: number): Promise<CategoryDto> {
        const result: CategoryDto[] = <CategoryDto[]> await this.mysqlService.findOneById(SELECTTXT.CATEGORY, id);
        return result[0];
    }
    

    @Post('category')
    @ApiOperation({ summary: 'Post new Category' })
    @ApiTags(`${ADMINDBTAG}:category`)
    @ApiBody({ type: CategoryDto })
    async postCat(@Body() createCat: CategoryDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT.CATEGORY, [createCat.categoryTypeId, createCat.categoryName, createCat.createdById, createCat.lastModifiedById]);
    }

    @Put('category')
    @ApiOperation({ summary: 'Update existing Category' })
    @ApiTags(`${ADMINDBTAG}:category`)
    @ApiBody({type: CategoryDto})
    async updateCat(@Body() updateCat: CategoryDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.CATEGORY, [updateCat.categoryTypeId, updateCat.categoryName, updateCat.lastModifiedById, updateCat.id]);
    }

    @Delete('category/:id')
    @ApiOperation({ summary: 'Delete existing Category by ID' })
    @ApiTags(`${ADMINDBTAG}:category`)
    @ApiParam({ name: 'id', description: 'ID of Category to delete' })
    async deleteCat(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT.CATEGORY, [ id ]);
    }

    /************************************************************/
    /* subcategory                                            */
    /************************************************************/
    @Get('subcategory')
    @ApiOperation({ summary: 'Get all SubCategories' })
    @ApiTags(`${ADMINDBTAG}:subcategory`)
    async getSubCats(): Promise<SubCategoryDto[]> {
        return <SubCategoryDto[]> await this.mysqlService.findAll(SELECTTXT.SUBCATEGORIES, []);
    }

    @Get('subcategory/categoryid')
    @ApiOperation( { summary: 'Get SubCategory by Category ID'})
    @ApiTags(`${ADMINDBTAG}:subcategory`)
    @ApiParam({ name: 'categoryid', description: 'ID of Category to find' })
    async getSubCatsByCat(@Param('categoryid') categoryId: number): Promise<SubCategoryDto[]> {
        return <SubCategoryDto[]> await this.mysqlService.findAll(SELECTTXT.SUBCATEGORIESBYCAT, [categoryId]);

    }
    
    @Get('subcategory/:id')
    @ApiOperation( { summary: 'Get SubCategory by ID'})
    @ApiTags(`${ADMINDBTAG}:subcategory`)
    @ApiParam({ name: 'id', description: 'ID of SubCategory to find' })
    async getSubCat(@Param('id') id: number): Promise<SubCategoryDto> {
        const result: SubCategoryDto[] = <SubCategoryDto[]> await this.mysqlService.findOneById(SELECTTXT.SUBCATEGORY, id);
        return result[0];
    }
    

    @Post('subcategory')
    @ApiOperation({ summary: 'Post new SubCategory' })
    @ApiTags(`${ADMINDBTAG}:subcategory`)
    @ApiBody({ type: SubCategoryDto })
    async postSubCat(@Body() createSubCat: SubCategoryDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT.SUBCATEGORY, [createSubCat.subcategoryName, createSubCat.categoryId, createSubCat.createdById, createSubCat.lastModifiedById]);
    }

    @Put('subcategory')
    @ApiOperation({ summary: 'Update existing SubCategory' })
    @ApiTags(`${ADMINDBTAG}:subcategory`)
    @ApiBody({type: SubCategoryDto})
    async updateSubCat(@Body() updateSubCat: SubCategoryDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.CATEGORY, [updateSubCat.subcategoryName, updateSubCat.categoryId, updateSubCat.lastModifiedById, updateSubCat.id]);
    }

    @Delete('subcategory/:id')
    @ApiOperation({ summary: 'Delete existing SubCategory by ID' })
    @ApiTags(`${ADMINDBTAG}:subcategory`)
    @ApiParam({ name: 'id', description: 'ID of SubCategory to delete' })
    async deleteSubCat(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT.SUBCATEGORY, [ id ]);
    }

    /************************************************************/
    /* payee                                                    */
    /************************************************************/
    @Get('payee')
    @ApiOperation({ summary: 'Get all Payee' })
    @ApiTags(`${ADMINDBTAG}:payee`)
    async getPayees(): Promise<PayeeDto[]> {
        return <PayeeDto[]> await this.mysqlService.findAll(SELECTTXT.PAYEES, []);
    }
    
    @Get('payee/:id')
    @ApiOperation( { summary: 'Get Payee by ID'})
    @ApiTags(`${ADMINDBTAG}:payee`)
    @ApiParam({ name: 'id', description: 'ID of Payee to find' })
    async getPayee(@Param('id') id: number): Promise<PayeeDto> {
        const result: PayeeDto[] = <PayeeDto[]> await this.mysqlService.findOneById(SELECTTXT.PAYEE, id);
        return result[0];
    }
    

    @Post('payee')
    @ApiOperation({ summary: 'Post new Payee' })
    @ApiTags(`${ADMINDBTAG}:payee`)
    @ApiBody({ type: PayeeDto })
    async postPayee(@Body() createPayee: PayeeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT.PAYEE, [createPayee.payeeName, createPayee.defaultSubCategoryId, createPayee.createdById, createPayee.lastModifiedById]);
    }

    @Put('payee')
    @ApiOperation({ summary: 'Update existing Payee' })
    @ApiTags(`${ADMINDBTAG}:payee`)
    @ApiBody({type: PayeeDto})
    async updatePayee(@Body() updatePayee: PayeeDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.updateOne(UPDATETXT.PAYEE, [updatePayee.payeeName, updatePayee.defaultSubCategoryId, updatePayee.lastModifiedById, updatePayee.id]);
    }

    @Delete('payee/:id')
    @ApiOperation({ summary: 'Delete existing Payee by ID' })
    @ApiTags(`${ADMINDBTAG}:payee`)
    @ApiParam({ name: 'id', description: 'ID of Payee to delete' })
    async deletePayee(@Param('id') id: number): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.deleteOne(DELTXT.PAYEE, [ id ]);
    }

    /************************************************************/
    /* transaction                                              */
    /************************************************************/
    @Post('transaction')
    @ApiOperation({ summary: 'Post imported transaction '})
    @ApiTags(`${ADMINDBTAG}:transaction`)
    @ApiBody({ type: CreateTransactionDto })
    async postImportedTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<DbModifyResult> {
        return <DbModifyResult> await this.mysqlService.insertOne(INSERTTXT['IMPORT-TRASACTION'], [createTransactionDto.tenantId, createTransactionDto.transactionAmount, createTransactionDto.transactionDate, 'I', createTransactionDto.payeeName, createTransactionDto.createdByUserName, createTransactionDto.transactionTypeName])
    }

}