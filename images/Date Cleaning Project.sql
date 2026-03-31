create database world_layoffs1;
drop table  layoffs_copy;
-- Data Cleaning -- 

-- 1. Remove Duplicates
-- 2. Standardize Data
-- 3. Null and Blank Values
-- 4. Remove Any Columns

-- Initial Assessment -- 
Select * from layoffs;
-- Copy Table --
create table layoffs_copy like layoffs;
insert layoffs_copy select*from layoffs;

-- Delete Column --
-- Alter table layoffs_copy3 --
-- drop column column_name; --

-- View Columns --
Select Distinct country from layoffs_copy2
order by 1;


CREATE TABLE `layoffs_copy` (
  `company` text,
  `location` text,
  `industry` text,
  `total_laid_off` int DEFAULT NULL,
  `percentage_laid_off` text,
  `date` text,
  `stage` text,
  `country` text,
  `funds_raised_millions` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select*from layoffs_copy;
-- -------------------- --
-- Find Duplicate --
Select*,count(*) from layoffs_copy
group by company, 
		 location, 
         industry, 
         total_laid_off,
         percentage_laid_off,
         `date`,
         stage,
         country,
         funds_raised_millions
Having Count(*)>1;
-- Create Table without DUPLICATES -- 
Create Table layoffs_copy2 AS 
Select Distinct 
		 company, 
		 location, 
         industry, 
         total_laid_off,
         percentage_laid_off,
         `date`,
         stage,
         country,
         funds_raised_millions
FROM layoffs_copy;

-- Validate if Duplicates Removed --
select*from layoffs_copy2
where company = ' E Inc.';
SELECT COUNT(*) From layoffs_copy;
SELECT COUNT(*) FROM layoffs_copy2;

Select*,count(*) from layoffs_copy2
group by company, 
		 location, 
         industry, 
         total_laid_off,
         percentage_laid_off,
         `date`,
         stage,
         country,
         funds_raised_millions
Having Count(*)>1;


-- Standardizing Data --

-- Trim leading and Trailing Spaces --
Select Distinct country from layoffs_copy2
order by 1;

select*from layoffs_copy2;
SELECT company, TRIM(company)
FROM layoffs_copy2
order by 1;

SELECT distinct country FROM layoffs_copy2
where country like 'United States%';

select distinct country, trim(trailing '.' From country)
from layoffs_copy2
order by 1;

UPDATE layoffs_copy2
set company = TRIM(company);

UPDATE layoffs_copy2
set country = TRIM(trailing '.' From country)
Where country like 'United States%';

-- Standardizing Date -- 
UPDATE layoffs_copy2
set `date` = str_to_date(`date`, '%m / %d / %Y');
Alter Table layoffs_copy2
modify column `date` DATE;
-- ------------------ --

select*from layoffs_copy2;
-- Use Clean dataset -- 
CREATE TABLE `layoffs_copy3` (
  `company` text,
  `location` text,
  `industry` text,
  `total_laid_off` int DEFAULT NULL,
  `percentage_laid_off` text,
  `date` text,
  `stage` text,
  `country` text,
  `funds_raised_millions` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
insert layoffs_copy3 select*from layoffs_copy2;

select*from layoffs_copy3;
-- --- -- -- -- -- -- 
-- DELEET NULL values -- 
select * from layoffs_copy3 
where total_laid_off is NULL
and percentage_laid_off is NULL;

DELETE 
FROM layoffs_copy3
where total_laid_off is NULL
and percentage_laid_off is NULL;

select*from layoffs_copy3;
-- --------------------- --
-- make the empty column a null --
UPDATE layoffs_copy3
SET industry = null
WHERE industry = '';

-- Search Null Values --
Select*from layoffs_copy3
where industry is NULL or industry = '';
-- use to check similar company and populate data --
select*from layoffs_copy3
where company LIKE 'BALLY%';


-- assign values to null values --
SELECT table1.industry, table2.industry
From layoffs_copy3 table1
JOIN layoffs_copy3 table2
	on table1.company = table2.company
    and table1.location = table2.location
WHERE (table1.industry is NULL or table1.industry ='')
AND table2.industry is NOT NULL;

UPDATE layoffs_copy3 table1
JOIN layoffs_copy3 table2
	on table1.company = table2.company
SET table1.industry = table2.industry
WHERE table1.industry is NULL
AND table2.industry is NOT NULL;
-- --- ---------- --- ------------- --
select*from layoffs_copy3;

