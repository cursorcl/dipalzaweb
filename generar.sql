ALTER DATABASE [MASTERSOFT]
SET COMPATIBILITY_LEVEL = 130 -- For SQL Server 2016
GO

USE [MASTERSOFT]
GO
/****** Object:  StoredProcedure [dbo].[calcularStock]    Script Date: 27-06-2021 21:18:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[calcularStock] 
	-- Add the parameters for the stored procedure here
	@id varchar(255)
	
	
AS
BEGIN
	declare @stock float
	declare @stock0 float
	declare @stock1 float
	declare @stock2 float
	declare @stock3 float
	declare @stock4 float
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	select @stock0 = sum(cantidad) from invdetallepartes  i, INVENCABEZAPARTES e where articulo = @id   and i.Id =  e.Id and i.Tipoid = 17 and i.Local ='000'
	select @stock1 = sum(cantidad) from invdetallepartes  i, INVENCABEZAPARTES e where articulo = @id   and i.Id =  e.Id  and i.Tipoid = 18 and i.Local ='000'
	select @stock2 = sum(cantidad)  from detalledocumento as d, encabezadocumento as e where d.articulo = @id and d.local = '000'  and d.tipoid = '09' and d.id = e.id  and e.vigente = 1
	select @stock3 =  sum(cantidad) from detalledocumento as d, encabezadocumento as e where d.articulo = @id and d.local = '000'  and d.tipoid in ('06', '10') and d.id = e.id  and e.vigente = 1 
	select @stock4 = sum(cantidad) from EOS_REGISTROS where articulo = @id

	set @stock = 0
	if @stock0 is not null
		set @stock = @stock0

	if @stock1 is not null
		set @stock = @stock - @stock1
	

	if @stock2 is not null
		set @stock = @stock + @stock2

	if @stock3 is not null
		set @stock = @stock - @stock3

	if @stock4 is not null
		set @stock = @stock - @stock4

	SELECT	"stock" = @stock
	return (@stock)

END

USE [MASTERSOFT]
GO
/****** Object:  StoredProcedure [dbo].[calcularStockNumerado]    Script Date: 28-06-2021 17:17:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[calcularStockNumerado] 
	-- Add the parameters for the stored procedure here
	@id varchar(255)
	
	
AS
BEGIN
	
	select articulo, sum(peso) as peso, count(peso) as cantidad from NUMERADOS where articulo = @id group by articulo



END


SET IDENTITY_INSERT EOS_REGISTROS ON