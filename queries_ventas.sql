select M.Vendedor, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha)) dia, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Vendedor, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha))
order by M.Vendedor, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha))

select M.Ruta, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha)) dia, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Ruta, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha))
order by M.Ruta, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha))

select M.Vendedor, M.Ruta, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha)) dia, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Vendedor, M.Ruta, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha))
order by M.Vendedor, M.Ruta, dateadd(DAY, 0, datediff(DAY, 0, E.Fecha))


select M.Vendedor, DATEPART(week, E.Fecha) AS  semana, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Vendedor, DATEPART(week, E.Fecha)
order by M.Vendedor, DATEPART(week, E.Fecha)

select M.Ruta, DATEPART(week, E.Fecha) AS  semana, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Ruta, DATEPART(week, E.Fecha)
order by M.Ruta, DATEPART(week, E.Fecha)

select M.Vendedor, M.Ruta,  DATEPART(YEAR, E.Fecha), DATEPART(week, E.Fecha) AS  semana, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2017-12-31' 
group by M.Vendedor, M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(week, E.Fecha)
order by M.Vendedor, M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(week, E.Fecha)



select M.Vendedor,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha) AS  mes, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Vendedor,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha)
order by M.Vendedor,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha)

select M.Ruta,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha) AS  mes, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Ruta,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha)
order by M.Ruta,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha)

select M.Vendedor, M.Ruta,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha) AS  mes, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Vendedor, M.Ruta,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha)
order by M.Vendedor, M.Ruta,  DATEPART(YEAR, E.Fecha),DATEPART(MONTH, E.Fecha)



select M.Vendedor, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha) AS  trimestre, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2017-12-31' 
group by M.Vendedor, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha)
order by M.Vendedor, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha)

select M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha) AS  trimestre, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2016-12-31' 
group by M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha)
order by M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha)

select M.Vendedor,M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha) AS  trimestre, sum(TotalNeto) as total from TOTALDOCUMENTO T, ENCABEZADOCUMENTO E, MSOCLIENTES M  where TipoId = '06' and T.Id = E.Id and E.Vigente = 1 and E.Rut = M.Rut and E.Codigo = M.Codigo 
and E.Fecha >='2016-01-01' and E.Fecha <='2017-12-31' 
group by M.Vendedor,M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha)
order by M.Vendedor,M.Ruta, DATEPART(YEAR, E.Fecha), DATEPART(QUARTER, E.Fecha)

