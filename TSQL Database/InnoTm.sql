USE [master]
GO
/****** Object:  Database [InnoTm]    Script Date: 02-07-2018 12:26:48 PM ******/
CREATE DATABASE [InnoTm]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'InnoTm', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\InnoTm.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'InnoTm_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\InnoTm_log.ldf' , SIZE = 1072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [InnoTm] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [InnoTm].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [InnoTm] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [InnoTm] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [InnoTm] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [InnoTm] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [InnoTm] SET ARITHABORT OFF 
GO
ALTER DATABASE [InnoTm] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [InnoTm] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [InnoTm] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [InnoTm] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [InnoTm] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [InnoTm] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [InnoTm] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [InnoTm] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [InnoTm] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [InnoTm] SET  ENABLE_BROKER 
GO
ALTER DATABASE [InnoTm] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [InnoTm] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [InnoTm] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [InnoTm] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [InnoTm] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [InnoTm] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [InnoTm] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [InnoTm] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [InnoTm] SET  MULTI_USER 
GO
ALTER DATABASE [InnoTm] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [InnoTm] SET DB_CHAINING OFF 
GO
ALTER DATABASE [InnoTm] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [InnoTm] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [InnoTm] SET DELAYED_DURABILITY = DISABLED 
GO
USE [InnoTm]
GO
/****** Object:  Table [dbo].[Transaction]    Script Date: 02-07-2018 12:26:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transaction](
	[TransID] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[RefId] [int] NOT NULL,
	[TransType] [int] NOT NULL,
	[InitialAmount] [money] NOT NULL,
	[AmountTransfer] [money] NOT NULL,
	[Date] [datetime] NOT NULL,
	[Status] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TransID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 02-07-2018 12:26:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[UserPassword] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[PhoneNumber] [nvarchar](max) NOT NULL,
	[Amount] [money] NOT NULL,
	[ImgUrl] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Transaction] ON 

INSERT [dbo].[Transaction] ([TransID], [UserId], [RefId], [TransType], [InitialAmount], [AmountTransfer], [Date], [Status]) VALUES (3, 1, 2, 0, 50000.0000, 400.0000, CAST(N'2018-06-22 10:59:39.837' AS DateTime), 1)
INSERT [dbo].[Transaction] ([TransID], [UserId], [RefId], [TransType], [InitialAmount], [AmountTransfer], [Date], [Status]) VALUES (4, 2, 1, 1, 5000.0000, 400.0000, CAST(N'2018-06-22 10:59:46.173' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Transaction] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserId], [UserName], [UserPassword], [Email], [PhoneNumber], [Amount], [ImgUrl]) VALUES (1, N'Satyam', N'123456', N'satyam@gmail.com', N'1234567890', 50000.0000, N'abddsvfd')
INSERT [dbo].[User] ([UserId], [UserName], [UserPassword], [Email], [PhoneNumber], [Amount], [ImgUrl]) VALUES (2, N'Shubham', N'S@123456', N'shubham@gmail.com', N'9234567890', 5000.0000, NULL)
INSERT [dbo].[User] ([UserId], [UserName], [UserPassword], [Email], [PhoneNumber], [Amount], [ImgUrl]) VALUES (3, N'Ankit', N'asdfghjkl', N'A@gmail.com', N'5786787879', 5000.0000, N'fdgfdgdsvfd')
INSERT [dbo].[User] ([UserId], [UserName], [UserPassword], [Email], [PhoneNumber], [Amount], [ImgUrl]) VALUES (4, N'Pawar', N'ddsdfdgs', N'p@war.com', N'3253456563', 6000.2222, N'null')
INSERT [dbo].[User] ([UserId], [UserName], [UserPassword], [Email], [PhoneNumber], [Amount], [ImgUrl]) VALUES (5, N'Manish', N'ertyui', N'm@nish.com', N'9436529654', 6000.2222, N'null')
SET IDENTITY_INSERT [dbo].[User] OFF
ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [fk_trans_refer_id] FOREIGN KEY([RefId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [fk_trans_refer_id]
GO
ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [fk_trans_user_id] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [fk_trans_user_id]
GO
USE [master]
GO
ALTER DATABASE [InnoTm] SET  READ_WRITE 
GO
