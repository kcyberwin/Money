import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { DatabaseService } from './db.service';

//DTOs
import { UserRoleDto } from './dto/useRole.dto';
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
import { PayeeMappingDto } from './dto/payeeMapping.dto';

const ADMINDBTAG: string = 'DB Routes';

@ApiTags('All DB Routes')
@Controller('api')
export class DBController {
  constructor(
    private databaseService: DatabaseService,
    private logger: Logger,
  ) {}

  /************************************************************/
  /* user-roles                                               */
  /************************************************************/
  @Get('user-roles')
  @ApiOperation({ summary: 'Get all User Roles' })
  @ApiTags(`${ADMINDBTAG}:user-role`)
  async getUserRoles(): Promise<UserRoleDto[]> {
    return await this.databaseService.getAllUserRoles();
  }

  @Get('user-role/:id')
  @ApiOperation({ summary: 'Get User Role by ID' })
  @ApiTags(`${ADMINDBTAG}:user-role`)
  @ApiParam({ name: 'id', description: 'ID of User Role to find' })
  async getUserRole(@Param('id') id: number): Promise<UserRoleDto> {
    return this.databaseService.getUserRoleById(id);
  }

  @Post('user-role')
  @ApiOperation({ summary: 'Post new User Role' })
  @ApiTags(`${ADMINDBTAG}:user-role`)
  @ApiBody({ type: UserRoleDto })
  async postUserRole(
    @Body() createUserRoleDto: UserRoleDto,
  ): Promise<UserRoleDto> {
    return this.databaseService.insertUserRole(createUserRoleDto);
  }

  @Put('user-role')
  @ApiOperation({ summary: 'Update existing User Role' })
  @ApiTags(`${ADMINDBTAG}:user-role`)
  @ApiBody({ type: UserRoleDto })
  async updateUserRole(
    @Body() updateUserRoleDto: UserRoleDto,
  ): Promise<boolean> {
    return this.databaseService.updateUserRoleById(updateUserRoleDto);
  }

  @Delete('user-role/:id')
  @ApiOperation({ summary: 'Delete existing User Role by ID' })
  @ApiTags(`${ADMINDBTAG}:user-role`)
  @ApiParam({ name: 'id', description: 'ID of User Role to delete' })
  async deleteUserRole(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteUserRoleById(id);
  }

  /************************************************************/
  /* user                                                     */
  /************************************************************/

  @Get('users')
  @ApiOperation({ summary: 'Get all Users' })
  @ApiTags(`${ADMINDBTAG}:user`)
  async getUsers(): Promise<UserDto[]> {
    return this.databaseService.getAllUsers();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiTags(`${ADMINDBTAG}:user`)
  @ApiParam({ name: 'id', description: 'ID of User to find' })
  async getUser(@Param('id') id: number): Promise<UserDto> {
    return this.databaseService.getUserById(id);
  }

  @Post('user')
  @ApiOperation({ summary: 'Post new User' })
  @ApiTags(`${ADMINDBTAG}:user`)
  @ApiBody({ type: UserDto })
  async postUser(@Body() createUserDto: UserDto): Promise<UserDto> {
    return this.databaseService.insertUser(createUserDto);
  }

  @Put('user')
  @ApiOperation({ summary: 'Update existing user' })
  @ApiTags(`${ADMINDBTAG}:user`)
  @ApiBody({ type: UserDto })
  async updateUser(@Body() updateUserDto: UserDto): Promise<boolean> {
    return this.databaseService.updateUserById(updateUserDto);
  }

  @Delete('user/:id')
  @ApiOperation({ summary: 'Delete existing user' })
  @ApiTags(`${ADMINDBTAG}:user`)
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteUserById(id);
  }

  /************************************************************/
  /* account-type                                             */
  /************************************************************/
  @Get('account-type')
  @ApiOperation({ summary: 'Get all account types' })
  @ApiTags(`${ADMINDBTAG}:account-type`)
  async getAccountTypes(): Promise<AccountTypeDto[]> {
    return this.databaseService.getAllAccountTypes();
  }

  @Get('account-type/:id')
  @ApiOperation({ summary: 'Get Account Type by ID' })
  @ApiTags(`${ADMINDBTAG}:account-type`)
  @ApiParam({ name: 'id', description: 'ID of Account Type to find' })
  async getAccountType(@Param('id') id: number): Promise<AccountTypeDto> {
    return this.databaseService.getAccountTypeById(id);
  }

  @Post('account-type')
  @ApiOperation({ summary: 'Post new Account Type' })
  @ApiTags(`${ADMINDBTAG}:account-type`)
  @ApiBody({ type: AccountTypeDto })
  async postAccountType(
    @Body() createAccountTypeDto: AccountTypeDto,
  ): Promise<AccountTypeDto> {
    return this.databaseService.insertAccountType(createAccountTypeDto);
  }

  @Put('account-type')
  @ApiOperation({ summary: 'Update existing Account Type' })
  @ApiTags(`${ADMINDBTAG}:account-type`)
  @ApiBody({ type: AccountTypeDto })
  async updateAccountType(
    @Body() updateAccountTypeDto: AccountTypeDto,
  ): Promise<boolean> {
    return this.databaseService.updateAccountTypeById(updateAccountTypeDto);
  }

  @Delete('account-type/:id')
  @ApiOperation({ summary: 'Delete existing Account Type by ID' })
  @ApiTags(`${ADMINDBTAG}:account-type`)
  @ApiParam({ name: 'id', description: 'ID of Account Type to delete' })
  async deleteAccountType(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteAccountTypeById(id);
  }

  /************************************************************/
  /* transaction-type                                             */
  /************************************************************/
  @Get('transaction-type')
  @ApiOperation({ summary: 'Get all Transaction Types' })
  @ApiTags(`${ADMINDBTAG}:transaction-type`)
  async getTransactionTypes(): Promise<TransactionTypeDto[]> {
    return this.databaseService.getAllTransactionTypes();
  }

  @Get('transaction-type/:id')
  @ApiOperation({ summary: 'Get Transaction Type by ID' })
  @ApiTags(`${ADMINDBTAG}:transaction-type`)
  @ApiParam({ name: 'id', description: 'ID of Transaction Type to find' })
  async getTransactionType(
    @Param('id') id: number,
  ): Promise<TransactionTypeDto> {
    return this.databaseService.getTransactionTypeById(id);
  }

  @Post('transaction-type')
  @ApiOperation({ summary: 'Post new Transaction Type' })
  @ApiTags(`${ADMINDBTAG}:transaction-type`)
  @ApiBody({ type: TransactionTypeDto })
  async postTransactionType(
    @Body() createTransactionTypeDto: TransactionTypeDto,
  ): Promise<TransactionTypeDto> {
    return this.databaseService.insertTransactionType(createTransactionTypeDto);
  }

  @Put('transaction-type')
  @ApiOperation({ summary: 'Update existing Transaction Type' })
  @ApiTags(`${ADMINDBTAG}:transaction-type`)
  @ApiBody({ type: TransactionTypeDto })
  async updateTransactionType(
    @Body() updateTransactionTypeDto: TransactionTypeDto,
  ): Promise<boolean> {
    return this.databaseService.updateTransactionTypeById(
      updateTransactionTypeDto,
    );
  }

  @Delete('transaction-type/:id')
  @ApiOperation({ summary: 'Delete existing Transaction Type by ID' })
  @ApiTags(`${ADMINDBTAG}:transaction-type`)
  @ApiParam({ name: 'id', description: 'ID of Transaction Type to delete' })
  async deleteTransactionType(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteTransactionTypeById(id);
  }

  /************************************************************/
  /* tenant                                                   */
  /************************************************************/
  @Get('tenant')
  @ApiOperation({ summary: 'Get all Tenants' })
  @ApiTags(`${ADMINDBTAG}:tenant`)
  async getTenants(): Promise<TenantDto[]> {
    return this.databaseService.getAllTenants();
  }

  @Get('tenant/:id')
  @ApiOperation({ summary: 'Get Tenant by ID' })
  @ApiTags(`${ADMINDBTAG}:tenant`)
  @ApiParam({ name: 'id', description: 'ID of Tenant to find' })
  async getTenant(@Param('id') id: number): Promise<TenantDto> {
    return this.databaseService.getTenantById(id);
  }

  @Post('tenant')
  @ApiOperation({ summary: 'Post new Tenant' })
  @ApiTags(`${ADMINDBTAG}:tenant`)
  @ApiBody({ type: TenantDto })
  async postTenant(@Body() createTenantDto: TenantDto): Promise<TenantDto> {
    return this.databaseService.insertTenant(createTenantDto);
  }

  @Put('tenant')
  @ApiOperation({ summary: 'Update existing Tenant' })
  @ApiTags(`${ADMINDBTAG}:tenant`)
  @ApiBody({ type: TenantDto })
  async updateTenant(@Body() updateTenantDto: TenantDto): Promise<boolean> {
    return this.databaseService.updateTenantById(updateTenantDto);
  }

  @Delete('tenant/:id')
  @ApiOperation({ summary: 'Delete existing Tenant by ID' })
  @ApiTags(`${ADMINDBTAG}:tenant`)
  @ApiParam({ name: 'id', description: 'ID of Tenant to delete' })
  async deleteTenant(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteTenantById(id);
  }

  /************************************************************/
  /* bank                                                   */
  /************************************************************/
  @Get('bank')
  @ApiOperation({ summary: 'Get all banks' })
  @ApiTags(`${ADMINDBTAG}:bank`)
  async getBanks(): Promise<BankDto[]> {
    return this.databaseService.getAllBanks();
  }

  @Get('bank/:id')
  @ApiOperation({ summary: 'Get Bank by ID' })
  @ApiTags(`${ADMINDBTAG}:bank`)
  @ApiParam({ name: 'id', description: 'ID of Bank to find' })
  async getBank(@Param('id') id: number): Promise<BankDto> {
    return this.databaseService.getBankById(id);
  }

  @Post('bank')
  @ApiOperation({ summary: 'Post new Bank' })
  @ApiTags(`${ADMINDBTAG}:bank`)
  @ApiBody({ type: BankDto })
  async postBank(@Body() createBankDto: BankDto): Promise<BankDto> {
    return this.databaseService.insertBank(createBankDto);
  }

  @Put('bank')
  @ApiOperation({ summary: 'Update existing Bank' })
  @ApiTags(`${ADMINDBTAG}:bank`)
  @ApiBody({ type: BankDto })
  async updateBank(@Body() updateBankDto: BankDto): Promise<boolean> {
    return this.databaseService.updateBankById(updateBankDto);
  }

  @Delete('bank/:id')
  @ApiOperation({ summary: 'Delete existing Bank by ID' })
  @ApiTags(`${ADMINDBTAG}:bank`)
  @ApiParam({ name: 'id', description: 'ID of Bank to delete' })
  async deleteBank(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteBankById(id);
  }

  /************************************************************/
  /* account                                                  */
  /************************************************************/
  @Get('account')
  @ApiOperation({ summary: 'Get all Accounts' })
  @ApiTags(`${ADMINDBTAG}:account`)
  async getAccounts(): Promise<AccountDto[]> {
    return this.databaseService.getAllAccounts();
  }

  @Get('account/:id')
  @ApiOperation({ summary: 'Get Account by ID' })
  @ApiTags(`${ADMINDBTAG}:account`)
  @ApiParam({ name: 'id', description: 'ID of Account to find' })
  async getAccount(@Param('id') id: number): Promise<AccountDto> {
    return this.databaseService.getAccountById(id);
  }

  @Post('account')
  @ApiOperation({ summary: 'Post new Account' })
  @ApiTags(`${ADMINDBTAG}:account`)
  @ApiBody({ type: AccountDto })
  async postAccount(@Body() createAccountDto: AccountDto): Promise<AccountDto> {
    return this.databaseService.insertAccount(createAccountDto);
  }

  @Put('account')
  @ApiOperation({ summary: 'Update existing Account' })
  @ApiTags(`${ADMINDBTAG}:account`)
  @ApiBody({ type: AccountDto })
  async updateAccount(@Body() updateAccountDto: AccountDto): Promise<boolean> {
    return this.databaseService.updateAccountById(updateAccountDto);
  }

  @Delete('account/:id')
  @ApiOperation({ summary: 'Delete existing Account by ID' })
  @ApiTags(`${ADMINDBTAG}:account`)
  @ApiParam({ name: 'id', description: 'ID of Account to delete' })
  async deleteAccount(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteAccountById(id);
  }

  /************************************************************/
  /* category-type                                            */
  /************************************************************/
  @Get('category-type')
  @ApiOperation({ summary: 'Get all Category Types' })
  @ApiTags(`${ADMINDBTAG}:category-type`)
  async getCatTypes(): Promise<CategoryTypeDto[]> {
    return this.databaseService.getAllCategoryTypes();
  }

  @Get('category-type/:id')
  @ApiOperation({ summary: 'Get Category Type by ID' })
  @ApiTags(`${ADMINDBTAG}:category-type`)
  @ApiParam({ name: 'id', description: 'ID of Category Type to find' })
  async getCatType(@Param('id') id: number): Promise<CategoryTypeDto> {
    return this.databaseService.getCategoryTypeById(id);
  }

  @Post('category-type')
  @ApiOperation({ summary: 'Post new Category Type' })
  @ApiTags(`${ADMINDBTAG}:category-type`)
  @ApiBody({ type: CategoryTypeDto })
  async postCatType(
    @Body() createCatType: CategoryTypeDto,
  ): Promise<CategoryTypeDto> {
    return this.databaseService.insertCategoryType(createCatType);
  }

  @Put('category-type')
  @ApiOperation({ summary: 'Update existing Category Type' })
  @ApiTags(`${ADMINDBTAG}:category-type`)
  @ApiBody({ type: CategoryTypeDto })
  async updateCatType(
    @Body() updateCatType: CategoryTypeDto,
  ): Promise<boolean> {
    return this.databaseService.updateCategoryTypeById(updateCatType);
  }

  @Delete('category-type/:id')
  @ApiOperation({ summary: 'Delete existing Category Type by ID' })
  @ApiTags(`${ADMINDBTAG}:category-type`)
  @ApiParam({ name: 'id', description: 'ID of Category Type to delete' })
  async deleteCatType(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteCategoryTypeById(id);
  }

  /************************************************************/
  /* category                                            */
  /************************************************************/
  @Get('category')
  @ApiOperation({ summary: 'Get all Categories' })
  @ApiTags(`${ADMINDBTAG}:category`)
  async getCats(): Promise<CategoryDto[]> {
    return this.databaseService.getAllCategories();
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Get Category by ID' })
  @ApiTags(`${ADMINDBTAG}:category`)
  @ApiParam({ name: 'id', description: 'ID of Category to find' })
  async getCat(@Param('id') id: number): Promise<CategoryDto> {
    return this.databaseService.getCategoryById(id);
  }

  @Post('category')
  @ApiOperation({ summary: 'Post new Category' })
  @ApiTags(`${ADMINDBTAG}:category`)
  @ApiBody({ type: CategoryDto })
  async postCat(@Body() createCat: CategoryDto): Promise<CategoryDto> {
    return this.databaseService.insertCategory(createCat);
  }

  @Put('category')
  @ApiOperation({ summary: 'Update existing Category' })
  @ApiTags(`${ADMINDBTAG}:category`)
  @ApiBody({ type: CategoryDto })
  async updateCat(@Body() updateCategoryDto: CategoryDto): Promise<boolean> {
    return this.databaseService.updateCategoryById(updateCategoryDto);
  }

  @Delete('category/:id')
  @ApiOperation({ summary: 'Delete existing Category by ID' })
  @ApiTags(`${ADMINDBTAG}:category`)
  @ApiParam({ name: 'id', description: 'ID of Category to delete' })
  async deleteCat(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteCategoryById(id);
  }

  /************************************************************/
  /* subcategory                                            */
  /************************************************************/
  @Get('subcategory')
  @ApiOperation({ summary: 'Get all SubCategories' })
  @ApiTags(`${ADMINDBTAG}:subcategory`)
  async getSubCats(): Promise<SubCategoryDto[]> {
    return this.databaseService.getAllSubcategories();
  }

  @Get('subcategory/categoryid')
  @ApiOperation({ summary: 'Get SubCategory by Category ID' })
  @ApiTags(`${ADMINDBTAG}:subcategory`)
  @ApiParam({ name: 'categoryid', description: 'ID of Category to find' })
  async getSubCatsByCat(
    @Param('categoryid') categoryId: number,
  ): Promise<SubCategoryDto[]> {
    return this.databaseService.getSubcategoriesByCategory(categoryId);
  }

  @Get('subcategory/:id')
  @ApiOperation({ summary: 'Get SubCategory by ID' })
  @ApiTags(`${ADMINDBTAG}:subcategory`)
  @ApiParam({ name: 'id', description: 'ID of SubCategory to find' })
  async getSubCategoryById(@Param('id') id: number): Promise<SubCategoryDto> {
    return this.databaseService.getSubCategoryById(id);
  }

  @Post('subcategory')
  @ApiOperation({ summary: 'Post new SubCategory' })
  @ApiTags(`${ADMINDBTAG}:subcategory`)
  @ApiBody({ type: SubCategoryDto })
  async postSubCat(
    @Body() createSubCat: SubCategoryDto,
  ): Promise<SubCategoryDto> {
    return this.databaseService.insertSubCategory(createSubCat);
  }

  @Put('subcategory')
  @ApiOperation({ summary: 'Update existing SubCategory' })
  @ApiTags(`${ADMINDBTAG}:subcategory`)
  @ApiBody({ type: SubCategoryDto })
  async updateSubCat(@Body() updateSubCat: SubCategoryDto): Promise<boolean> {
    return this.databaseService.updateSubCategoryById(updateSubCat);
  }

  @Delete('subcategory/:id')
  @ApiOperation({ summary: 'Delete existing SubCategory by ID' })
  @ApiTags(`${ADMINDBTAG}:subcategory`)
  @ApiParam({ name: 'id', description: 'ID of SubCategory to delete' })
  async deleteSubCat(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deleteSubCategoryById(id);
  }

  /************************************************************/
  /* payee                                                    */
  /************************************************************/
  @Get('payee')
  @ApiOperation({ summary: 'Get all Payee' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  async getPayees(): Promise<PayeeDto[]> {
    return this.databaseService.getAllPayees();
  }

  @Get('payee/:id')
  @ApiOperation({ summary: 'Get Payee by ID' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  @ApiParam({ name: 'id', description: 'ID of Payee to find' })
  async getPayee(@Param('id') id: number): Promise<PayeeDto> {
    return this.databaseService.getPayeeById(id);
  }

  @Post('payee')
  @ApiOperation({ summary: 'Post new Payee' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  @ApiBody({ type: PayeeDto })
  async postPayee(@Body() createPayee: PayeeDto): Promise<PayeeDto> {
    return this.databaseService.insertPayee(createPayee);
  }

  @Put('payee')
  @ApiOperation({ summary: 'Update existing Payee' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  @ApiBody({ type: PayeeDto })
  async updatePayee(@Body() updatePayeeDto: PayeeDto): Promise<boolean> {
    return this.databaseService.updatePayeeById(updatePayeeDto);
  }

  @Delete('payee/:id')
  @ApiOperation({ summary: 'Delete existing Payee by ID' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  @ApiParam({ name: 'id', description: 'ID of Payee to delete' })
  async deletePayee(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deletePayeeById(id);
  }

  /************************************************************/
  /* payee mapping                                            */
  /************************************************************/
  @Get('payee-mapping')
  @ApiOperation({ summary: 'Get all Payee Mappings' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  async getPayeeMappings(): Promise<PayeeMappingDto[]> {
    return this.databaseService.getAllPayeeMappings();
  }

  @Get('payee-mapping/:id')
  @ApiOperation({ summary: 'Get Payee Mapping by ID' })
  @ApiTags(`${ADMINDBTAG}:payee-mapping`)
  @ApiParam({ name: 'id', description: 'ID of Payee Map to find' })
  async getPayeeMap(@Param('id') id: number): Promise<PayeeMappingDto> {
    return this.databaseService.getPayeeMapById(id);
  }

  @Get('payee-mapping/:payeeId')
  @ApiOperation({ summary: 'Get' })
  @ApiTags(`${ADMINDBTAG}:payee-mapping`)
  @ApiParam({
    name: 'payeeId',
    description: 'ID of Payee to find all mappings for',
  })
  async getPayeeMapByPayee(
    @Param('payeeId') payeeId: number,
  ): Promise<PayeeMappingDto[]> {
    return this.databaseService.getPayeeMapByPayee(payeeId);
  }

  @Post('payee-mapping')
  @ApiOperation({ summary: 'Post new Payee' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  @ApiBody({ type: PayeeMappingDto })
  async postPayeeMap(
    @Body() createPayeeMap: PayeeMappingDto,
  ): Promise<PayeeMappingDto> {
    return this.databaseService.insertPayeeMap(createPayeeMap);
  }

  @Put('payee-mapping')
  @ApiOperation({ summary: 'Update existing Payee' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  @ApiBody({ type: PayeeDto })
  async updatePayeeMapById(@Body() updatePayeeDto: PayeeDto): Promise<boolean> {
    return this.databaseService.updatePayeeById(updatePayeeDto);
  }

  @Delete('payee-mapping/:id')
  @ApiOperation({ summary: 'Delete existing Payee by ID' })
  @ApiTags(`${ADMINDBTAG}:payee`)
  @ApiParam({ name: 'id', description: 'ID of Payee to delete' })
  async deletePayeeMapById(@Param('id') id: number): Promise<boolean> {
    return this.databaseService.deletePayeeById(id);
  }
}
